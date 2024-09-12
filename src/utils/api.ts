import Category from "@/components/dashboard/Category";
const baseUrl = process.env.BASE_URL;
const baseUrl2 = process.env.BASE_URL_2;
export const EndPoint = {
  LOGIN_API: `${baseUrl}/employee/login/`,
  SIGNUP_API: `${baseUrl}/employee/signup/`,
  GET_ALL_EMPLOY: `${baseUrl}/employee/list/`,

  SECOND_DATABASE_TEACHER_GET: `${baseUrl2}/support/web/teacher/`,

  SECOND_DATABASE_TEACHER_ADD: `${baseUrl2}/support/web/teacher/`,
  GET_ALL_DEPARTMENT_LIST: `${baseUrl2}/support/web/department-dropdown-list-for-teacher-create/`,

  GET_ALL_SUBJECT_LIST: `${baseUrl2}/support/web/subject-dropdown-list-for-teacher-create/`,

  FOLLOW_UP_ADD: `${baseUrl}/follow_up/add/`,
  FOLLOW_UP_LIST: `${baseUrl}/follow_up/list/`,

  CATEGORY_LIST_DROPDOWN: `${baseUrl2}/support/web/category-drop-down-list/`,
  GET_ALL_PACKAGE_LIST: `${baseUrl}/package-plan/package/dropdown`,
  GET_ALL_PLAN_LIST: `${baseUrl}/package-plan/plan/dropdwon/`,
  GET_ALL_PACKAGE_PLAN_LIST: `${baseUrl}/package-plan/price/plan/dropdown/`,

  EMPLOYEE_DATAILS: `${baseUrl}/employee/list/`,
  EMPLOYEE_UPDATE: `${baseUrl}/employee/update/`,
  EMPLOYEE_PASSWORD_UPDATE: `${baseUrl}/employee/without_password/`,
  EMPLOYEE_DELETE: `${baseUrl}/employee/delete/`,
  EMPLOYEE_DROPDOWN_LIST: `${baseUrl}/employee/dropdown/`,
  EMPLOYEE_GROUP_PERMISSION_DROPDOWN_LIST: `${baseUrl}/employee/group_permission/dropdown/`,
  UPDATE_EMPLOYEE_ROLE: `${baseUrl}/employee/group_permission/user/update/`,

  ADD_CATAGORY: `${baseUrl}/category/add/`,
  GET_CATAGORY: `${baseUrl}/category/list/`,
  GET_DROPDOWN_CATAGORY: `${baseUrl}/category/catgegory_dropdown/`,
  GET_CATAGORY_BY_ID: `${baseUrl}/category/retrieve/`,
  DELETE_CATAGORY: `${baseUrl}/category/delete/`,
  UPDATE_CATAGORY: `${baseUrl}/category/update/`,

  ADD_PROBIDAN: `${baseUrl}/semester-control/probidhan_add/`,
  GET_PROBIDAN: `${baseUrl}/semester-control/probidhan_list/`,
  GET_DROPDOWN_PROBIDAN: `${baseUrl}/semester-control/probidhan_dropdown_list/`,
  GET_PROBIDAN_BY_ID: `${baseUrl}/semester-control/probidhan_retrieve/`,
  DELETE_PROBIDAN: `${baseUrl}/semester-control/probidhan_delete/`,
  UPDATE_PROBIDAN: `${baseUrl}/semester-control/probidhan_update/`,

  ADD_SESSION: `${baseUrl}/semester-control/session_add/`,
  GET_SESSION: `${baseUrl}/semester-control/probidhan_session/`,
  GET_DROPDOWN_SESSION: `${baseUrl}/semester-control/session_dropdown/`,
  GET_SESSION_BY_ID: `${baseUrl}/semester-control/session_retrive/`,
  DELETE_SESSION: `${baseUrl}/semester-control/session_delete/`,
  UPDATE_SESSION: `${baseUrl}/semester-control/session_update/`,

  ADD_DUET_SCHEDUL: `${baseUrl}/semester-control/duet_exam_add/`,
  GET_DUET_SCHEDUL: `${baseUrl}/semester-control/duet_exam_list/`,
  GET_DROPDOWN_DUET_SCHEDUL: `${baseUrl}/semester-control/duet_exam_dropdown_list/`,
  GET_DUET_SCHEDUL_BY_ID: `${baseUrl}/semester-control/duet_exam_retrieve/`,
  DELETE_DUET_SCHEDUL: `${baseUrl}/semester-control/duet_exam_delete/`,
  UPDATE_DUET_SCHEDUL: `${baseUrl}/semester-control/duet_exam_update/`,

  ADD_SEMESTER_SCHEDUL: `${baseUrl}/semester-control/semester_schedule_add/`,
  GET_SEMESTER_SCHEDUL: `${baseUrl}/semester-control/semester_schedule_list/`,
  GET_DROPDOWN_SEMESTER_SCHEDUL: `${baseUrl}/semester-control/semester_schedule_dropdown_list/`,
  GET_SEMESTER_SCHEDUL_BY_ID: `${baseUrl}/semester-control/semester_schedule_retrieve/`,
  DELETE_SEMESTER_SCHEDUL: `${baseUrl}/semester-control/semester_schedule_delete/`,
  UPDATE_SEMESTER_SCHEDUL: `${baseUrl}/semester-control/semester_schedule_update/`,
  SEMESTER_DROPDOWN_LIST: `${baseUrl}/enrollment/semester/dropdown/`,

  ADD_DEPARTMENT: `${baseUrl}/department/add/`,
  GET_DEPARTMENT: `${baseUrl}/department/list/`,
  GET_DROPDOWN_DEPARTMENT: `${baseUrl}/department/dropdown/`,
  GET_DEPARTMENT_BY_ID: `${baseUrl}/department/retrieve/`,
  DELETE_DEPARTMENT: `${baseUrl}/department/delete/`,
  UPDATE_DEPARTMENT: `${baseUrl}/department/update/`,

  ADD_POLYTECHNIC: `${baseUrl}/polytechnic/add/`,
  GET_POLYTECHNIC: `${baseUrl}/polytechnic/list/`,
  GET_DROPDOWN_POLYTECHNIC: `${baseUrl}/polytechnic/dropdown/`,
  GET_POLYTECHNIC_BY_ID: `${baseUrl}/polytechnic/retrieve/`,
  DELETE_POLYTECHNIC: `${baseUrl}/polytechnic/delete/`,
  UPDATE_POLYTECHNIC: `${baseUrl}/polytechnic/update/`,
  SEARCH_DEPARTMENT_BY_POLYTECHNIC: `${baseUrl}/polytechnic/search_by_institute/`,

  ADD_STUDENT: `${baseUrl}/student/add/`,
  GET_STUDENT: `${baseUrl}/student/list/`,
  GET_STUDENT_BY_ID: `${baseUrl}/student/retrieve/`,
  DELETE_STUDENT: `${baseUrl}/student/delete/`,
  UPDATE_STUDENT: `${baseUrl}/student/update/`,
  STUDENT_PHONE_NUMBER: `${baseUrl}/student/phone_number/`,
  STUDENT_NAV_DATA: `${baseUrl}/employee/statistics/`,

  Category_SUPPORT: `${baseUrl2}/support/web/support-students/`,
  SUPPORT_DETAILS: `${baseUrl2}/support/web/support-students/details/`,
  SUPPORT_TEACHER: `${baseUrl2}/support/web/teacher-drop-down/list/`,
  SUPPORT_TRANSFER: `${baseUrl2}/support/web/support-students/transfer/`,
  SUPPORT_HISTORY: `${baseUrl2}/support/web/support-transfers/`,
  SUPPORT_STATISTICS: `${baseUrl2}/support/web/total-statistics/`,
  SUPPORT_TEACHER_STATISTICS: `${baseUrl2}/support/web/teacher-supports-statistics/`,
  SUPPORT_TEACHER_UPDATE: `${baseUrl2}/support/web/teacher/`,
  STUDENT_PORTAL_SUPPORT_SUMMARY: `${baseUrl2}/web/student-portal-support-summary/`,
  STUDENT_PORTAL_SUPPORT_HISTORY: `${baseUrl2}/web/student-portal-support-history/`,
  STUDENT_PORTAL_SUPPORT_APP_ACTIVITY: `${baseUrl2}/support/web/student-portal-app-activity/`,

  SUPPORT_NAVBAR_DATA: `${baseUrl2}/support/web/teacher-statistics-in-teacher-dashboard/`,
  SUPPORT_STATUS_CHECK: `${baseUrl2}/support/web/support-status-check/`,
  SUPPORT_CATEGORY_SUMMARY: `${baseUrl2}/support/web/category-support-summary/`,
  SUPPORT_BASE_SUMMARY: `${baseUrl2}/support/web/batch-support-summary/`,
  SUPPORT_DROPDOWN_LIST: `${baseUrl2}/support/web/custom-date-filters/`,
  SUPPORT_DETAILS_ADMIN: `${baseUrl2}/support/web/total-support-history-for-admin/`,
  SUPPORT_CATEGORY: `${baseUrl2}/support/web/category-drop-down-list/`,
  SUPPORT_VIEW_BY_ID: `${baseUrl2}/support/web/support/`,

  ADD_BOOK: `${baseUrl}/softmax-book/add/`,
  ALL_BOOK: `${baseUrl}/softmax-book/list/`,
  BOOK_BY_ID: `${baseUrl}/softmax-book/retrieve/`,
  BOOK_UPDATE: `${baseUrl}/softmax-book/update/`,
  BOOK_SALE: `${baseUrl}/softmax-book/transaction/add/`,
  DROPDOWN_BOOK: `${baseUrl}/softmax-book/dropdown/`,
  BOOK_SALE_SUMMARY: `${baseUrl}/softmax-book/transaction/list/`,
  BOOK_SALE_UPDATE: `${baseUrl}/softmax-book/transaction/update/`,

  ADD_PLAN: `${baseUrl}/package-plan/plan/add/`,
  GET_ALL_PLAN: `${baseUrl}/package-plan/plan/list/`,
  GET_PLAN_BY_ID: `${baseUrl}/package-plan/plan/retrieve/`,
  DELETE_PLAN: `${baseUrl}/package-plan/plan/delete/`,
  UPDATE_PLAN: `${baseUrl}/package-plan/plan/update/`,

  ADD_TARGET: `${baseUrl}/category/target/add/`,
  GET_ALL_TARGET: `${baseUrl}/category/target/all/`,
  GET_TARGET_BY_ID: `${baseUrl}/category/target/retrieve/`,
  DELETE_TARGET: `${baseUrl}/category/target/delete/`,
  UPDATE_TARGET: `${baseUrl}/category/target/update/`,

  // dashboard

  DASHBOARD_TARGET: `${baseUrl}/category/target/list/`,
  DASHBOARD_ALL_TARGET: `${baseUrl}/category/target/all/`,
  DASHBOARD_CATEGORY: `${baseUrl}/enrollment/dashboard/category/list/`,
  DASHBOARD_PACKAGE: `${baseUrl}/dashboard/v2/package_statistics/`,
  DASHBOARD_PLAN: `${baseUrl}/dashboard/v2/plan_statistics`,
  DASHBOARD_SALES_USER: `${baseUrl}/dashboard/v2/user_statistics/`,
  DASHBOARD_SALES_DEPARTMENT: `${baseUrl}/dashboard/department_statistics/`,
  DASHBOARD_CATEGORY_SALE: `${baseUrl}/dashboard/v2/category_statistics/`,
  DASHBOARD_SALES_USER_MONTHLY: `${baseUrl}/dashboard/v2/monthly/user_statistics/`,
  DASHBOARD_SALES_USER_DAILY: `${baseUrl}/dashboard/v2/daily/user_statistics/`,

  DASHBOARD_EMPLOYEE_DAILY_RANKING: `${baseUrl}/dashboard/user/daily/rankings/`,
  DASHBOARD_EMPLOYEE_MONTHLY_RANKING: `${baseUrl}/dashboard/user/monthly/rankings/`,

  DASHBOARD_CURRENT_SALE: `${baseUrl}/dashboard/enrollment-statistics/`,

  DASHBOARD_SEMESTER_ANALYTICS: `${baseUrl}/dashboard/semester/analytics/statistics/`,
  DASHBOARD_INSTITUTE_ANALYTICS: `${baseUrl}/dashboard/polytechnic/session/analytics/statistics/`,

  DASHBOARD_SESSION_ANALYTICS: `${baseUrl}/dashboard/session/analytics/statistics/`,
  DASHBOARD_DEPARTMENT_ANALYTICS: `${baseUrl}/dashboard/department/session/analytics/statistics/`,

  OVERALL_STATESTICS: `${baseUrl}/enrollment/statistics/`,
  DASHBOARD_DEPARTMENT_MONTHLY_SALE: `${baseUrl}/dashboard/monthly/department_statistics/`,
  DASHBOARD_INSTITUTE_MONTHLY_SALE: `${baseUrl}/dashboard/v2/monthly/polytechnic/statistics/`,
  DASHBOARD_SEMESTER_SALE: `${baseUrl}/dashboard/semester/statistics/`,
  DASHBOARD_INSTITUTE_SALE: `${baseUrl}/dashboard/polytechnic/statistics/`,
  DASHBOARD_JOB_SALE: `${baseUrl}/dashboard/job/statistics/`,
  DASHBOARD_DUET_SALE: `${baseUrl}/dashboard/duet/statistics/`,
  ENROLLMENT_DAILY_CHART: `${baseUrl}/dashboard/chart/enrollment/daily/statistics/`,
  ENROLLMENT_MONTHLY_CHART: `${baseUrl}/dashboard/chart/enrollment/monthly/statistics/`,
  DASHBOARD_JOB_ANALYTICS_YEARLY: `${baseUrl}/dashboard/job/yearly/statistics/`,
  DASHBOARD_DUET_ANALYTICS_YEARLY: `${baseUrl}/dashboard/duet/yearly/statistics/`,

  ENROLLMENT_DAILY_CHART_2: `${baseUrl}/dashboard/chart/dynamic/daily/statistics/`,
  ENROLLMENT_MONTHLY_CHART_2: `${baseUrl}/dashboard/chart/dynamic/monthly/statistics/`,

  ENROLLMENT_MONTHLY_CHART_3: `${baseUrl}/dashboard/chart/polytechnic/dynamic/monthly/statistics/`,

  //sales chart/dashboard/chart/dynamic/daily/statistics/?
  POLYTECHNIC_DAILY_CHART: `${baseUrl}/dashboard/chart/polytechnic/dynamic/daily/statistics/`,
  POLYTECHNIC_MONTHLY_CHART: `${baseUrl}/dashboard/chart/polytechnic/dynamic/monthly/statistics/`,
  DEPARTMENT_DAILY_CHART: `${baseUrl}/dashboard/chart/department/dynamic/daily/statistics/`,
  DEPARTMENT_MONTHLY_CHART: `${baseUrl}/dashboard/chart/department/dynamic/monthly/statistics/`,

  ADD_CUSTOM_DATE: `${baseUrl}/custom-date/add/`,
  GET_ALL_CUSTOM_DATE: `${baseUrl}/custom-date/list/`,
  GET_CUSTOM_DATE_BY_ID: `${baseUrl}/custom-date/retrieve/`,
  DELETE_CUSTOM_DATE: `${baseUrl}/custom-date/delete/`,
  UPDATE_CUSTOM_DATE: `${baseUrl}/custom-date/update/`,

  ADD_INDEPENDENT_DATE: `${baseUrl}/custom-date/independent/add/`,
  GET_ALL_INDEPENDENT_DATE: `${baseUrl}/custom-date/independent/list/`,
  GET_INDEPENDENT_DATE_BY_ID: `${baseUrl}/custom-date/independent/retrieve/`,
  DELETE_INDEPENDENT_DATE: `${baseUrl}/custom-date/independent/delete/`,
  UPDATE_INDEPENDENT_DATE: `${baseUrl}/custom-date/independent/update/`,

  ADD_DUET_PACKAGE: `${baseUrl}/service/duet/add/`,
  GET_ALL_DUET_PACKAGE: `${baseUrl}/service/duet/list/`,
  GET_DUET_PACKAGE_BY_ID: `${baseUrl}/service/duet/retrieve/`,
  UPDATE_DUET_PACKAGE: `${baseUrl}/service/duet/update/`,

  ADD_SEMESTER_PACKAGE: `${baseUrl}/service/semester/add/`,
  GET_ALL_SEMESTER_PACKAGE: `${baseUrl}/service/semester/list/`,
  GET_SEMESTER_PACKAGE_BY_ID: `${baseUrl}/service/semester/retrieve/`,
  UPDATE_SEMESTER_PACKAGE: `${baseUrl}/service/semester/update/`,
  DELETE_SEMESTER_PACKAGE: `${baseUrl}/service/semester/delete/`,
  GET_DROPDOWN_SEMESTER_SERVICE: `${baseUrl}/semester-control/semester_schedule_dropdown/`,

  ADD_CUSTOMDATE_PACKAGE: `${baseUrl}/service/custom_date/add/`,
  GET_ALL_CUSTOMDATE_PACKAGE: `${baseUrl}/service/custom_date/list/`,
  GET_CUSTOMDATE_PACKAGE_BY_ID: `${baseUrl}/service/custom_date/retrieve/`,
  UPDATE_CUSTOMDATE_PACKAGE: `${baseUrl}/service/custom_date/update/`,
  DELETE_CUSTOMDATE_PACKAGE: `${baseUrl}/service/custom_date/delete/`,

  ADD_INDEPENDENT_PACKAGE: `${baseUrl}/service/independent_days/add/`,
  GET_ALL_INDEPENDENT_PACKAGE: `${baseUrl}/service/independent_days/list/`,
  GET_INDEPENDENT_PACKAGE_BY_ID: `${baseUrl}/service/independent_days/retrieve/`,
  UPDATE_INDEPENDENT_PACKAGE: `${baseUrl}/service/independent_days/update/`,
  DELETE_INDEPENDENT_PACKAGE: `${baseUrl}/service/independent_days/delete/`,

  GET_INDEPENDENT_DAYS_DROPDOWN: `${baseUrl}/custom-date/independent/dropdown/`,
  GET_CUSTOM_DATE_DROPDOWN: `${baseUrl}/custom-date/dropdown/`,
  GET_DROPDOWN_DUET_SERVICE: `${baseUrl}/semester-control/duet_exam/dropdown/`,
  PLAN_DROPDOWN: `${baseUrl}/package-plan/plan/dropdwon/`,
  DELETE_DUET_PACKAGE: `${baseUrl}/service/duet/delete/`,

  ADD_ENROLLMENT: `${baseUrl}/enrollment/add/`,
  GET_ENROLLMENT_BY_ID: `${baseUrl}/enrollment/retrieve/`,
  DELETE_ENROLLMENT: `${baseUrl}/enrollment/delete/`,
  UPDATE_ENROLLMENT: `${baseUrl}/enrollment/update/`,

  UPDATE_INSTALLMENT: `${baseUrl}/enrollment/installment/signals/update/`,
  GET_DUE_ENROLLMENT: `${baseUrl}/enrollment/installment/signals/list/`,
  GET_DUE_ENROLLMENT_BYID: `${baseUrl}/enrollment/installment/retrieve/`,

  GET_ENROLLMENT_LIST: `${baseUrl}/enrollment/list/`,
  ENROLLMENT_STATISTICS: `${baseUrl}/enrollment/statistics/`,
  DUE_ENROLLMENT_LIST: `${baseUrl}/enrollment/installment/student/list/`,
  ADD_DUE_PAYMENT: `${baseUrl}/enrollment/installment/add/`,
  DUE_PENDING_LIST: `${baseUrl}/enrollment/installment/list/`,

  UPDATE_PACKAGE_PLAN_PRICE: `${baseUrl}/package-plan/price/update/`,
  GET_PACKAGE_PLAN_PRICE_LIST: `${baseUrl}/package-plan/price/list/`,
  DELETE_PACKAGE_PLAN_PRICE: `${baseUrl}/package-plan/price/delete/`,
  GET_PACKAGE_PLAN_PRICE_BY_ID: `${baseUrl}/package-plan/price/retrieve/`,
  ADD_PACKAGE_PLAN_PRICE: `${baseUrl}/package-plan/price/add/`,

  //role permission
  ADD_GROUP: `${baseUrl}/employee/group/add/`,
  GET_ALL_GROUP: `${baseUrl}/employee/group/list/`,
  GET_GROUP_BY_ID: `${baseUrl}/employee/group/retrieve/`,
  DELETE_GROUP: `${baseUrl}/employee/group/delete/`,
  UPDATE_GROUP: `${baseUrl}/employee/group/update/`,
  GET_DROPDOWN_GROUP: `${baseUrl}/employee/group/dropdown/`,

  PERMISSION_LIST: `${baseUrl}/employee/permission/list/`,

  ADD_PERMISSION: `${baseUrl}/employee/group_permission/add/`,
  GET_ALL_PERMISSION: `${baseUrl}/employee/group_permission/list/`,
  GET_PERMISSION_BY_ID: `${baseUrl}/employee/group_permission/retrieve/`,
  DELETE_PERMISSION: `${baseUrl}/employee/group_permission/delete/`,
  UPDATE_PERMISSION: `${baseUrl}/employee/group_permission/update/`,

  ADD_EMPLOYEE_PERMISSION: `${baseUrl}/employee/user_group/add/`,
  GET_ALL_EMPLOYEE_PERMISSION: `${baseUrl}/employee/api/users/`,
  GET_EMPLOYEE_PERMISSION_BY_ID: `${baseUrl}/employee/api/users/`,
  DELETE_EMPLOYEE_PERMISSION: `${baseUrl}/employee/user_group/delete/`,
  UPDATE_EMPLOYEE_PERMISSION: `${baseUrl}/employee/group_permission/user/update/`,
};
