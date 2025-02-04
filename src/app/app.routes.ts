import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventiComponent } from './pages/eventi/eventi.component';
import { EventiDetailsComponent } from './pages/eventi/eventi-details/eventi-details.component';
import { TalkRelatoriComponent } from './pages/talk-relatori/talk-relatori.component';
import { PartnerComponent } from './pages/partner/partner-details/partner-details.component';
import { PrenotazioneComponent } from './pages/prenotazione/prenotazione.component';
import { AreaUtenteComponent } from './pages/area-utente/area-utente.component';
import { RelatoreDetailComponent } from './pages/talk-relatori/relatore-detail-component/relatore-detail-component.component';
import { AccountComponent } from './pages/auth/account/account.component';
import { ForgotPasswordComponent } from './pages/auth/account/forgotten-password/forgotten-password.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'eventi', component: EventiComponent },
  { path: 'eventi/:id', component: EventiDetailsComponent },
  { path: 'meeting', component: TalkRelatoriComponent },
  { path: 'meeting/:id', component: RelatoreDetailComponent }, // Aggiunto route per dettagli relatore
  { path: 'partner', component: PartnerComponent },
  { path: 'prenotazione', component: PrenotazioneComponent },
  { path: 'area-utente', component: AreaUtenteComponent },
  { path: 'area-utente/:id', component: AreaUtenteComponent },
  { path: 'auth/account', component: AccountComponent },
  { path: 'auth/account/forgotten-password', component: ForgotPasswordComponent }
];
