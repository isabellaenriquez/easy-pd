/** capitalizes the given string */
export function capitalize(aString: string): string {
    return aString.replace(/\w\S*/g, (w) =>
        w.replace(/^\w/, (c) => c.toUpperCase())
    );
}

/** checks if given string is in email format */
export function isEmail(emailInput: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // will not work for emails that don't have dots or that have spaces
    return re.test(emailInput.toLowerCase());
}

/** checks if the input is undefined depending on its type */
export function isUndefined(v: any): boolean {
    if (v == null && !(typeof v === 'number' && v === 0)) { // checks for null and undefined
        return true;
    } else {
        if (typeof v === 'string') {
            return (v === "");
        } else if (typeof v === 'number') {
            return (isNaN(v));
        } else if (Array.isArray(v)) {
            return (v.length === 0);
        } else if (typeof v === 'object') {
            return (Object.keys(v).length === 0);
        } 
    }
    return false;
}