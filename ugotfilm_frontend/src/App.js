import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainView from './mainview/Tmdb_mainView';
import MyPage from './components/mypage/mypage';
import MovieDetail from './tmdb/Tmdb_detail';
import Genre_pop from './tmdb/Tmdb_genre_pop';
import Genre_vote from './tmdb/Tmdb_genre_vote';
import Person from './tmdb/Tmdb_person';
import BoardList from './components/board/board_list';
import BoardView from './components/board/board_view';
import BoardWrite from './components/board/board_write';
import BoardUpdate from './components/board/board_update';
import Movie from './tmdb/Movie_general';
import LoginPage from './components/login/LoginPage';
import LogOut from './components/login/logOut';
import JoinForm from './components/login/JoinForm';
import { Role } from './commonApi_tmdb/commonConst';
import PrivateRoute from './routes/privateRoute';
import UserUpdate from './components/mypage/user_update';
import MoreNow from './tmdb/Tmdb_more_now';
import MorePop from './tmdb/Tmdb_more_pop';
import PasswordModify from './components/mypage/password_up';
import AdminMain from './components/admin/adminMain';
import AdminLayout from './components/admin/adminLayout';
import AdminMember from './components/admin/adminMember';
import AdminComment from './components/admin/adminComment';
import AdminMemberUpdate from './components/admin/adminMemberUpdate';
import FirstChoice from './Curation/FirstChoice';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute
              isAuth={true}
              RouteComponent={MainView}
              roles={[Role.MEMBER, Role.MANAGER, Role.ADMIN]}
            />
          }
        >
          <Route index element={<Movie />} />
          <Route path='firstchoice' element={<FirstChoice />} />
          <Route
            path='board'
            element={
              <PrivateRoute
                isAuth={false}
                RouteComponent={BoardList}
                roles={[]}
              />
            }
          >
            <Route path='list/:currentPage' element={<BoardList />} />
          </Route>
          <Route path='board/view/:currentPage/:num' element={<BoardView />} />
          <Route
            path='board/write'
            element={
              <PrivateRoute
                isAuth={false}
                RouteComponent={BoardWrite}
                roles={[Role.ADMIN, Role.MANAGER, Role.MEMBER]}
              />
            }
          />
          <Route
            path='board/write/:currentPage/:num'
            element={<BoardWrite />}
          />
          <Route
            path='board/write/:currentPage/:num/:ref/:re_step/:re_level'
            element={<BoardWrite />}
          />
          <Route
            path='board/update/:currentPage/:num'
            element={<BoardUpdate />}
          />
          <Route path='movie/now' element={<MoreNow />} />
          <Route path='movie/pop' element={<MorePop />} />
          <Route path='detail/:movie_id' element={<MovieDetail />} />
          <Route path='genre/pop/:genre_id' element={<Genre_pop />} />
          <Route path='genre/vote/:genre_id' element={<Genre_vote />} />
          <Route path='person/:person_id' element={<Person />} />
        </Route>

        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/mypage'
          element={
            <PrivateRoute
              isAuth={true}
              RouteComponent={MyPage}
              roles={[Role.ADMIN, Role.MANAGER, Role.MEMBER]}
            />
          }
        />
        <Route path='/pwmodify' element={<PasswordModify />} />
        <Route path='/join' element={<JoinForm />} />
        <Route path='/update' element={<UserUpdate />} />
        <Route path='/logout' element={<LogOut />} />
        <Route
          path='/admin/'
          element={
            <PrivateRoute
              isAuth={true}
              RouteComponent={AdminLayout}
              roles={[Role.MANAGER, Role.ADMIN]}
            />
          }
        >
          <Route index element={<AdminMain />} />
          <Route path='mem/:currentPage' element={<AdminMember />} />
          <Route
            path='mem/update/:usercode/:authRole'
            element={<AdminMemberUpdate />}
          />
          <Route path='comment/:currentPage' element={<AdminComment />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
