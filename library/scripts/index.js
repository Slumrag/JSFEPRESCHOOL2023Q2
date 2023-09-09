const stage1 = `
Этап 1 +52
	* Ограниченная карусель в блоке About +25 ✅
	* Слайдер в блоке Favorites +25 ✅
	* До авторизации +2 ✅
`;
const stage2 = `Этап 2 +49
	* Меню авторизации при нажатии на иконку пользователя +8 ✅
	* Модальное окно REGISTER +29
	* Окончание регистрации +8 ✅
	* При наличии регистрации, но будучи не авторизованным +4 ✅
`;
const stage3 = `Этап 3 +29
	* Модальное окно LOGIN +27 ✅
	* Блок Favorites +2 ✅
`;
const stage4 = `Этап 4 +76
	* Меню профиля при нажатии на иконку с инициалами пользователя +16 ✅
	* Модальное окно MY PROFILE +25 ✅
	* Блок Favorites +6 ✅
	* Модальное окно BUY A LIBRARY CARD +27 ✅
	* Блок Digital Library Cards +2 ✅
`;
const EVALUATION_MESSAGE = `Оценка работы: 206
${stage1}
${stage2}
${stage3}
${stage4}
`;
const DEPLOY_LINK = 'https://rolling-scopes-school.github.io/slumrag-JSFEPRESCHOOL2023Q2/library/';
console.info(EVALUATION_MESSAGE);
console.log(DEPLOY_LINK);
