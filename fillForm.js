(function fillRobloxForm() {
    
    const generateCredentials = () => {
        const letters = "abcdefghijklmnopqrstuvwxyz";
        const stringLength = Math.floor(Math.random() * (13 - 6 + 1)) + 6; // 6 to 13 characters
        
        let randomString = "";
        for (let i = 0; i < stringLength; i++) {
            randomString += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        
        
        const digits = Math.floor(100 + Math.random() * 900).toString(); 
        const username = `${randomString}${digits}`;

        
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let password = "";
        for (let i = 0; i < 14; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return { username, password };
    };

    const data = {
        ...generateCredentials(),
        birthday: { month: 'Jan', day: '01', year: '2000' },
        gender: 'Male'
    };

    
    const forceValue = (id, value) => {
        const input = document.getElementById(id);
        if (!input) return;
        
        const lastValue = input.value;
        input.value = value;
        const event = new Event('input', { bubbles: true });
        
        const tracker = input._valueTracker;
        if (tracker) {
            tracker.setValue(lastValue);
        }
        
        input.dispatchEvent(event);
        input.dispatchEvent(new Event('change', { bubbles: true }));
    };

    
    forceValue('signup-username', data.username);
    forceValue('signup-password', data.password);

    
    const setDropdown = (id, val) => {
        const el = document.getElementById(id);
        if (el) {
            el.value = val;
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }
    };
    setDropdown('MonthDropdown', data.birthday.month);
    setDropdown('DayDropdown', data.birthday.day);
    setDropdown('YearDropdown', data.birthday.year);

    
    if (data.gender) {
        const genderId = data.gender === 'Male' ? 'MaleButton' : 'FemaleButton';
        const btn = document.getElementById(genderId);
        if (btn) btn.click();
    }

    
    const attemptRegistration = (attemptNumber) => {
        const regBtn = document.getElementById('signup-button');
        if (regBtn) {
            regBtn.click();
        }
    };

    
    setTimeout(() => {
        attemptRegistration(1);
        setTimeout(() => {
            attemptRegistration(2);
        }, 3000);
    }, 3000);

    
    return { username: data.username, password: data.password };
})();
