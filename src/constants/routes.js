export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';

export const LANDING = '/';
export const HOME = '/home';
export const ACCOUNT = '/account';
export const PASSWORD_FORGET = '/pw-forget';

//1.
export const MY_COURSES = '/my_courses';

//2. internal pages nested routes
export const CREATE = '/create';
export const COURSE_MANAGE = '/course_manage/:cid/edit';
export const COURSE_MANAGE_INFO = '/course_manage/:cid/edit/info';
export const COURSE_MANAGE_CURRI = '/course_manage/:cid/edit/curriculum';
export const COURSE_MANAGE_SETTINGS = '/course_manage/:cid/edit/settings';
export const COURSE_MANAGE_ASSIGNMENT = '/course_manage/:cid/edit/assignment';

//3.
export const T_DASHBOARD = '/dashboard/'; // fetch t info with authUser credential
export const T_DASHBOARD_COURSES = '/dashboard/courses';
export const T_DASHBOARD_Q_PANEL = '/dashboard/questions';

export const DASHBOARD_Q_PANEL_BY_C_TITLE = '/t-dashboard/questions/:cTitle';
export const DASHBOARD_Q_PANEL_BY_UNREAD = '/t-dashboard/questions/unread';


//4. external pages nested routes
export const TEACHER_PAGE = '/teacher/:tName'; // query t info with t name
export const TEACHER_PAGE_COURSES = '/teacher/:tName/courses';
export const TEACHER_PAGE_QUESTIONS = '/teacher/:tName/questions';

//5.
export const COURSE_PAGE = '/:tName/:cTitle'; // query t info with c title
export const QUESTION_PAGE = '/teacher/:tName/question/:qNum'; // q details, get access from TEACHER_PAGE_QUESTIONS, and fetch q detail from q list

//TEACHER DASHBOARD,
