(function fillRobloxForm() {
    // Pure JS Dynamic Random Generation (e.g., "sahdkadhwqkh831")
    const generateCredentials = () => {
        const letters = "abcdefghijklmnopqrstuvwxyz";
        const stringLength = Math.floor(Math.random() * (13 - 6 + 1)) + 6; // 6 to 13 characters
        
        let randomString = "";
        for (let i = 0; i < stringLength; i++) {
            randomString += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        
        // Exactly 3 digits
        const digits = Math.floor(100 + Math.random() * 900).toString(); 
        const username = `${randomString}${digits}`;

        // Random Password
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

    // Special input updater framework bypass for React/Next
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

    // Force Random Username and Password into the UI
    forceValue('signup-username', data.username);
    forceValue('signup-password', data.password);

    // Set Birthday
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

    // Click Gender Button
    if (data.gender) {
        const genderId = data.gender === 'Male' ? 'MaleButton' : 'FemaleButton';
        const btn = document.getElementById(genderId);
        if (btn) btn.click();
    }

    // Handle registration clicks
    const attemptRegistration = (attemptNumber) => {
        const regBtn = document.getElementById('signup-button');
        if (regBtn) {
            regBtn.click();
        }
    };

    // Click execution timing sequence
    setTimeout(() => {
        attemptRegistration(1);
        setTimeout(() => {
            attemptRegistration(2);
        }, 3000);
    }, 3000);

    // Return credentials object to main node stream
    return { username: data.username, password: data.password };
})();