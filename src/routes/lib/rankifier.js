export function rankifier(input) {
    if (String(input).length > 1 && String(input)[String(input).length - 2] != 1 || String(input).length == 1) {
        if (String(input)[String(input).length - 1] == "1")    {
            return `${input}st`;
        } else if (String(input)[String(input).length - 1] == "2") {
            return `${input}nd`;
        } else if (String(input)[String(input).length - 1] == "3") {
            return `${input}rd`;
        } else {
            return `${input}th`;
        }
    } else {
        if (String(input).length > 1 && String(input)[String(input).length - 2] == 1)   {
            return `${input}th`;
        } else {
            return `${input} bug!`;
        }
        
    }
}