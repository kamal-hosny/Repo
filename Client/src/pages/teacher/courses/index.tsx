import { GetServerSideProps } from 'next'
import { useTranslation } from 'react-i18next'

export default function TeacherCoursesPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">
          {t('teacher.myCourses')}
        </h1>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          {t('teacher.createCourse')}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {t('teacher.noCourses')}
          </h3>
          <p className="text-muted-foreground">
            {t('teacher.noCoursesDescription')}
          </p>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} }
}
