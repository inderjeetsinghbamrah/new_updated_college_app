import { userState } from '@/stores/userStore'
import { useRecoilValue } from 'recoil'
import LogoutUI from '../common/LogoutUI'
import { AppSidebar } from '../app-sidebar'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import TopMenu from '../common/TopMenu'

export const Home = () => {

    const user = useRecoilValue(userState)

    return (
        <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopMenu/>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50">
                Admin Home. Welcome {user.username}
                            <LogoutUI />

                </div>
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
    )
}
