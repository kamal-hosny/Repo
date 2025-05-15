const Student = () => {
  return (
    <>
      {/* ------------------- student section ------------------- */}
      <section className=" bg-black h-full  text-white">
        <div className="container w-full max-w-none px-5 flex">
          {/* ----------------- left blue col ----------------- */}

          <div className="py-3 w-32 mx-5 bg-blue-800 left h-auto flex justify-center items-start">
            <i className="fa-solid fa-user me-3 text-3xl"></i>
          </div>

          {/* ----------------- middle col ----------------- */}

          <div className="middle w-full flex flex-col h-auto">
            {/* ----------------- top red row ----------------- */}

            <div className="py-3 flex justify-between bg-red-800 middle px-5 middle-up">
              <div className="flex ">
                <div className="flex left items-center">
                  <div>
                    <i className="fa-solid fa-user me-3 text-3xl"></i>
                  </div>
                  <div>
                    <div>adam ibraheem</div>
                    <div>student</div>
                  </div>
                </div>
                <div className="ms-3 bg-black text-white w-[120px] h-10 flex items-center justify-center">
                  3rd grade
                </div>
              </div>
              <div className="flex items-end">
                <div className="me-2">student ID: 1234565</div>
                <div>
                  <i className="fa-regular fa-clone"></i>
                </div>
              </div>
            </div>
            {/* ----------------- bottom gray row ----------------- */}

            <div className="personal flex flex-col mt-10 p-3 bg-slate-500 h-screen	 px-10">
              {/* --------- 1st row --------- */}

              <div className="flex justify-between">
                <div className="flex w-4/6 justify-start items-center">
                  <div>
                    <i className="fa-solid fa-user me-3 text-3xl"></i>
                  </div>
                  <div className="px-4 font-bold">personal info</div>
                  <div className="underline text-gray-800">student</div>
                </div>
                <div className="flex w-4/6 justify-end items-center">
                  <div className="font-bold">edit</div>
                  <div className="ps-4">
                    <i className="fa-solid fa-pen"></i>
                  </div>
                </div>
              </div>

              {/* --------- 2nd row --------- */}

              <div className="flex justify-between mt-10">
                <div className="flex w-2/6 h-10  border-0 border-b-2 py-2">
                  First Name
                </div>

                <div className="flex w-2/6 h-10  border-0 border-b-2 py-2">
                  Last Name
                </div>
              </div>

              {/* --------- 3rd row --------- */}

              <div className="flex justify-between mt-10">
                <div className="flex w-2/6 h-10  py-2 flex-col gap-y-2">
                  <div>password</div>
                  <div className="border-0 border-b-2 ">21321321*****</div>
                </div>

                <div className="flex w-2/6 h-10 border-0 border-b-2  py-8 flex-col gap-y-2">
                  <div>username</div>
                  <div className=""></div>
                </div>
              </div>

              {/* --------- 4th row --------- */}

              <div className="flex justify-between mt-10">
                <div className="flex w-2/6 h-10  py-2 flex-col gap-y-2">
                  <div>phone number</div>
                  <div className="border-0 border-b-2 ">21321321*****</div>
                </div>

                <div className="flex w-2/6 h-10  py-2 flex-col gap-y-2">
                  <div>email</div>
                  <div className="border-0 border-b-2 text-blue-400">
                    verified
                  </div>
                </div>
              </div>

              {/* --------- 5th row --------- */}

              <div className="flex justify-between mt-20 ">
                <div className="flex flex-col gap-y-4">
                  <div className="flex gap-x-2  items-center">
                    <div className="font-bold text-3xl">ID Info</div>
                    <div className="text-blue-800">
                      you can't change that{" "}
                      <span className="underline">learn more</span>
                    </div>
                  </div>
                  <div className="flex gap-x-4 justify-between px-10">
                    <div>university ID</div>
                    <div>13213********</div>
                    <div className="text-gray-700">show</div>
                  </div>
                  <div className="flex gap-x-3 justify-between px-10 items-center">
                    <div>Student ID</div>
                    <div>12312312451</div>
                    <div>
                      <i className="fa-regular fa-clone"></i>
                    </div>
                  </div>
                </div>
                <div className="w-2/6 flex flex-col gap-y-4">
                  <div className="flex gap-x-3 ">
                    <div>account type: </div>
                    <div>
                      <i className="fa-regular fa-square-check"></i>
                    </div>
                  </div>
                  <div className="flex gap-x-3">
                    <div>Student</div>
                    <div>you can't change this</div>
                  </div>
                </div>
              </div>

              {/* --------- 6th row --------- */}

              <div className="flex mt-4 gap-x-7 w-2/6">
                <div>
                  <i className="fa-regular fa-building"></i>
                </div>
                <div>university information</div>
                <div>cairo</div>
                <div>
                  <i className="fa-regular fa-square-check"></i>
                </div>
              </div>

              {/* --------- 7th row --------- */}

              <div className="flex justify-between mt-10">
                <div className="flex w-2/6 h-10  py-2 flex-col gap-y-2">
                  <div>university name</div>
                  <div className="border-0 border-b-2 "></div>
                </div>

                <div className="flex w-2/6 h-10  py-2 flex-col gap-y-2">
                  <div>university email</div>
                  <div className="border-0 border-b-2 text-blue-400">
                    verified
                  </div>
                </div>
              </div>

              {/* --------- 8th row --------- */}

              <div className="flex justify-between mt-20">
                <div className="flex w-2/6 h-10  py-2 flex-col gap-y-2">
                  <div>social media links</div>
                  <div className="border-0 border-b-2 ">https://www.google.com/search?sxsrf=</div>
                </div>

                <div className="flex w-2/6 h-10  py-2 flex-col gap-y-2">
                  <div>grade</div>
                  <div className="border-0 border-b-2 text-blue-400">
                    verified
                  </div>
                </div>
              </div>

              {/* --------- 9th row --------- */}

              <div className="flex justify-between mt-20">
                <div className="flex w-2/6 h-10  py-2 flex-col gap-y-2">
                  <div>social media links</div>
                  <div className="border-0 border-b-2 ">https://www.google.com/search?sxsrf=</div>
                </div>

                <div className="flex w-2/6 h-10  py-2 flex-col gap-y-2">
                  <div>university phone number</div>
                  <div className="border-0 border-b-2 text-blue-400">
                    01001*****
                  </div>
                </div>
              </div>


            </div>
          </div>

          {/* ----------------- right golden col ----------------- */}

          <div className="py-3 px-7 mx-5 w-96 bg-yellow-700 flex flex-col h-auto items-start right">
            <div className="flex-1 flex items-center">
              <div className="upper">
                <div className="mb-3">
                  Courses <i className="fa-solid fa-book text-2xl  ms-2"></i>
                </div>
                <div className="mb-2">Language</div>
                <div className="mb-2">Ara</div>
                <div>ENG</div>
              </div>
            </div>
            <div className="lower mt-auto">Joined since May 2025</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Student;
