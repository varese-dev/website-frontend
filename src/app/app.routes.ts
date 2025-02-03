import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventiComponent } from './pages/eventi/eventi.component';
import { TalkRelatoriComponent } from './pages/talk-relatori/talk-relatori.component';
import { PartnerComponent } from './pages/partner/partner.component';
import { PrenotazioneComponent } from './pages/prenotazione/prenotazione.component';
import { AreaUtenteComponent } from './pages/area-utente/area-utente.component';
import { AccountComponent } from './pages/auth/account/account.component';
import {
  RelatoreDetailComponent
} from './pages/talk-relatori/relatore-detail-component/relatore-detail-component.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'eventi', component: EventiComponent },
  { path: 'meeting', component: TalkRelatoriComponent },
  { path: 'meeting/:id', component: RelatoreDetailComponent },
  { path: 'partner', component: PartnerComponent },
  { path: 'prenotazione', component: PrenotazioneComponent },
  { path: 'area-utente', component: AreaUtenteComponent },
  { path: 'auth/account', component: AccountComponent },
];
