import { GetServerSideProps } from 'next'
import { useTranslation } from 'react-i18next'

export default function AdminUsersPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">
          {t('admin.userManagement')}
        </h1>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          {t('admin.addUser')}
        </button>
      </div>
      
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {t('admin.noUsers')}
        </h3>
        <p className="text-muted-foreground">
          {t('admin.noUsersDescription')}
        </p>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} }
}
