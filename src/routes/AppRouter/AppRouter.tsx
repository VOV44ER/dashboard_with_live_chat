import * as React from 'react';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { HistoryRouter } from '../HistoryRouter/HistoryRouter';
import { history } from '../historyHelper/history';
import { NewTemplateForm } from '../../components/NewTemplateForm/NewTemplateForm';
import { Auth } from '../../pages/Auth/Auth';
import { SignIn } from '../../pages/Auth/screens/SignIn/SignIn';
import { Main } from '../../pages/Main/Main';
import { Chat } from '../../pages/Main/screens/Chat/Chat';
import { Dashboard } from '../../pages/Main/screens/Dashboard/Dashboard';
import { Templates } from '../../pages/Main/screens/Templates/Templates';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicRoute from '../PublicRoute/PublicRoute';
import {
  DASHBOARD_SCREEN,
  CHAT_SCREEN,
  SIGN_IN_SCREEN,
  TEMPLATES_SCREEN,
  NEWTEMPLATE_SCREEN,
  CONTACTS_SCREEN,
  CAMPAINGS_SCREEN,
  NEWCAMPAINGS_SCREEN,
  SHOWCAMPAIGNS_SCREEN,
  SIGN_UP_SCREEN,
} from '../routes';
import { TemplatesTable } from '../../components/TemplatesTable/TemplatesTable';
import { Contacts } from '../../pages/Main/screens/Contacts/Contacts';
import { Campaings } from '../../pages/Main/screens/Campaings/Campaings';
import { CampaingsTable } from '../../components/CampaingsTable/CampaingsTable';
import { NewCampaingsForm } from '../../components/NewCampaingsForm/NewCampaingsForm';
import { ShowCampaign } from '../../components/ShowCampaign/ShowCampaign';
import { SignUp } from '../../pages/Auth/screens/SignUp/SignUp';

export const AppRouter: React.FC = () => (
  <HistoryRouter history={history}>
    <Routes>
      <Route
        element={(
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        )}
      >
        <Route path={DASHBOARD_SCREEN} element={<Dashboard />} />
        <Route path={CHAT_SCREEN} element={<Chat />}>
          <Route path=":partner" element={<Chat />} />
        </Route>
        <Route path={TEMPLATES_SCREEN} element={<Templates />}>
          <Route index element={<TemplatesTable />} />
          <Route path={NEWTEMPLATE_SCREEN} element={<NewTemplateForm />}>
            <Route path=":duplicate" element={<NewTemplateForm />} />
          </Route>
        </Route>
        <Route path={CONTACTS_SCREEN} element={<Contacts />} />
        <Route path={CAMPAINGS_SCREEN} element={<Campaings />}>
          <Route index element={<CampaingsTable />} />
          <Route path={NEWCAMPAINGS_SCREEN} element={<NewCampaingsForm />} />
          <Route path={SHOWCAMPAIGNS_SCREEN} element={<ShowCampaign />} />
        </Route>
        <Route path="*" element={<Navigate to={DASHBOARD_SCREEN} />} />
      </Route>
      <Route
        element={(
          <PublicRoute>
            <Auth />
          </PublicRoute>
        )}
      >
        <Route path={SIGN_IN_SCREEN} element={<SignIn />} />
        <Route path={SIGN_UP_SCREEN} element={<SignUp />} />
        <Route path="*" element={<Navigate to={SIGN_IN_SCREEN} />} />
      </Route>
    </Routes>
  </HistoryRouter>
);
