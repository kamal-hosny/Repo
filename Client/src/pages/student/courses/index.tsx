import { GetServerSideProps } from 'next'
import { useTranslation } from 'react-i18next'

export default function StudentCoursesPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">
          {t('navigation.courses')}
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Course cards will be rendered here */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {t('student.noCourses')}
          </h3>
          <p className="text-muted-foreground">
            {t('student.noCoursesDescription')}
          </p>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} }
}
