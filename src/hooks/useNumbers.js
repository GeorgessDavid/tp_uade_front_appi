const onlyNumbers = (e) => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

    if (allowedKeys.includes(e.key)) {
        return;
    }

    if (e.key < '0' || e.key > '9') {
        e.preventDefault();
    }
}

const maxLength = (e, max) => {
    if (e.target.value.length >= max && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
        e.preventDefault();
    }
}

export { onlyNumbers, maxLength };