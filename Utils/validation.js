export const validations = {
    email: {
        presence: {
            message: 'Please enter an email address '
        },
        format: {
            pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            message: 'Please enter a valid email address'
        }
    },
    password: {
        presence: {
            message: 'Please enter a password '
        }, length: {
            minimun:{
                val: 5,
                message: 'your password must be at least 5 characters'
            }
        }
    },
    title: {
        presence: {
            message: 'Enter a title'
        }
    },
    description: {
        presence: {
            message: 'enter a description'
        }
    }
};
export function validate (nameField, value) {
    let result = { isError: false, messageError: '' };
    if (validations.hasOwnProperty(nameField)) {
        let v = validations[nameField]
        if (value == '' || value === null) {
            result = { isError: true, messageError: v.presence.message }
        } else if (v.hasOwnProperty('format') && !v.format.pattern.test(value)) {
            result = { isError: true, messageError: v.format.message}
        } else if(v.hasOwnProperty('length')){
            let l = v['length'];
            if(l.hasOwnProperty('minimum') && value.length<l['minimun']['val']){
                result = { isError: true, messageError: v.presence.message}
            }else if(l.hasOwnProperty('maximun') && value.length<l['maximun']['val']){
                result = { isError: true, messageError: v.presence.message}
            }
        }
        else {
            result.isError = false
        }
    } else {
        result.isError = false
    }
    return result
}