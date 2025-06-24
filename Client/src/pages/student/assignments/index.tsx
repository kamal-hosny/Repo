import { GetServerSideProps } from 'next'
import { useTranslation } from 'react-i18next'

export default function StudentAssignmentsPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">
          {t('navigation.assignments')}
        </h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {t('student.noAssignments')}
          </h3>
          <p className="text-muted-foreground">
            {t('student.noAssignmentsDescription')}
          </p>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} }
}
