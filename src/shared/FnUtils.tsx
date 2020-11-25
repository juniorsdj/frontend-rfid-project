export const goToIndex = () => {
    const { protocol, host } = window.location;
    window.location.replace(`${protocol}//${host}/#/`);
};
