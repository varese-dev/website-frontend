import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventiComponent } from './pages/eventi/eventi.component';
import { EventiDetailsComponent } from './pages/eventi/eventi-details/eventi-details.component';
import { TalkRelatoriComponent } from './pages/talk-relatori/talk-relatori.component';
import { PartnerComponent } from './pages/partner/partner.component';
import { PartnerDetailsComponent } from './pages/partner/partner-details/partner-details.component';
import { PrenotazioneComponent } from './pages/prenotazione/prenotazione.component';
import { AreaUtenteComponent } from './pages/area-utente/area-utente.component';
import { AccountComponent } from './pages/auth/account/account.component';
import { RelatoreDetailComponent } from './pages/talk-relatori/relatore-detail-component/relatore-detail-component.component';
import { ForgotPasswordComponent } from './pages/auth/account/forgotten-password/forgotten-password.component';
import { CreateTalkComponent } from './create-talk/create-talk.component';
import { CreateNewEventComponent } from './create-event/create-event.component';
import { CreateTagComponent } from './create-tag/create-tag.component';
import {AdminDashboardComponent} from './pages/admin-dashboard/admin.component';
import {EditEventComponent} from './edit-event/edit-event.component';
import {EditTalkComponent} from './edit-talk/edit-talk.component';
import {EditTagComponent} from './edit-tag/edit-tag.component';
import {CreatePartnerComponent} from './create-partner/create-partner.component';
import {EditPartnerComponent} from './edit-partner/edit-partner.component';
import { AuthGuard } from './guards/auth.guard';
import {NotFoundComponent} from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'eventi', component: EventiComponent },
  { path: 'eventi/:id', component: EventiDetailsComponent },
  { path: 'meeting', component: TalkRelatoriComponent },
  { path: 'meeting/:id', component: RelatoreDetailComponent },
  { path: 'partner', component: PartnerComponent },
  { path: 'partner-details/:id', component: PartnerDetailsComponent },
  { path: 'prenotazione', component: PrenotazioneComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'area-utente', component: AreaUtenteComponent },
  { path: 'area-utente/:id', component: AreaUtenteComponent },
  { path: 'auth/account', component: AccountComponent },
  { path: 'auth/account/forgotten-password', component: ForgotPasswordComponent },
  { path: 'create-talk', component: CreateTalkComponent },
  { path: 'create-event', component: CreateNewEventComponent },
  { path: 'create-tag', component: CreateTagComponent },
  { path: 'edit-event/:id', component: EditEventComponent },
  { path: 'edit-talk/:id', component: EditTalkComponent },
  { path: 'edit-tag/:id', component: EditTagComponent },
  { path: 'edit-partner/:id', component: EditPartnerComponent },
  { path: 'create-partner', component: CreatePartnerComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

