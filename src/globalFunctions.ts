/** capitalizes the given string */
export function capitalize(aString: string): string {
    return aString.replace(/\w\S*/g, (w) =>
        w.replace(/^\w/, (c) => c.toUpperCase())
    );
}

/** checks if the input is undefined depending on its type */
export function isUndefined(v: any): boolean {
    if ((typeof v) === "string"){
        return ((v === undefined) || v === null || v === "");
    } else if ((typeof v) === "object") {
        return ((v === undefined) || v === null || v === {});
    } else if ((typeof v) === "number") {
        return (isNaN(v) || v === undefined || v === null || v === "");
    } else {
        console.log("the type " + (typeof v) + " has not been logged yet");
        return true
    }
}