import json
import os
from typing import Callable
import pymongo
from pymongo.errors import ConnectionFailure
from pymongo.database import Database
from dotenv import load_dotenv

load_dotenv()


def load_json(json_path):
    with open(json_path, "r") as f:
        data = json.loads(f.read())

    if not data or len(data) == 0:
        raise ValueError("Empty json file.")

    return data


def read_collection(db: Database, collection_name: str, columns: [str] = None):
    if columns is None:
        columns = ["_id"]

    collection = db[collection_name]
    fetch_columns = {col: 1 for col in columns}
    read_results_cursor = collection.find({}, fetch_columns)
    read_results = [[doc[col] for col in columns] for doc in read_results_cursor]

    # print(read_results)
    return read_results


def insert_records_with_update(
    db: Database,
    collection_name: str,
    synthetic_data_json_path: str,
    data_update: Callable = None,
):
    data = load_json(synthetic_data_json_path)
    collection = db[collection_name]

    if data_update:
        data = data_update(db, data)

    insert_results = collection.insert_many(data)
    print(insert_results)
    return insert_results


def insert_records(db: Database, collection_name: str, synthetic_data_json_path: str):
    return insert_records_with_update(
        db, collection_name, synthetic_data_json_path, None
    )


def update_lectures(db: Database, data: []):
    for record in data:
        record["date"] = 1707206945
        record["name"] += " Lecture"
        del record["teachers"]
        del record["lectures"]
    return data


def update_with_courses_ids(db: Database, data: []):
    courses_ids = [str(course[0]) for course in read_collection(db, "courses")]
    for record in data:
        record["courses"] = courses_ids
    return data


def insert_data():
    try:
        client = pymongo.MongoClient(os.getenv("MONGO_URI"))
        client.admin.command("ping")
        print("Connected to mongodb server successfully.")

        DATABASE_NAME: str = os.getenv("DATABASE_NAME")
        db = client[DATABASE_NAME]

        synthetic_courses_path = "generated/5-courses.json"
        insert_records(db, "courses", synthetic_courses_path)

        insert_records_with_update(
            db, "lectures", synthetic_courses_path, update_lectures
        )

        synthetic_students_path = "generated/5-students.json"
        insert_records_with_update(
            db, "students", synthetic_students_path, update_with_courses_ids
        )

        # read_collection(db, "courses")

    except ConnectionFailure as e:
        print(f"Could not connect to MongoDB: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        if client:
            client.close()
            print("Connection to mongodb server closed.")


if __name__ == "__main__":
    insert_data()
