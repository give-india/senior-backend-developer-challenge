export function genericPayloadValidator(payloadSchema, payload) {
    for (const field in payloadSchema) {
        const fieldSchema = payloadSchema[field];

        if (fieldSchema.required && !payload[field]) {
            return `Missing required field: ${field}`;
        }

        if (typeof payload[field] !== fieldSchema.type) {
            return `Invalid type for field ${field}. Expected ${fieldSchema.type}`;
        }

        if (fieldSchema.minLength && payload[field].length < fieldSchema.minLength) {
            return `Field ${field} should have a minimum length of ${fieldSchema.minLength}`;
        }

        if (fieldSchema.format && !fieldSchema.format.test(payload[field])) {
            return `Field ${field} has an invalid format`;
        }

        if (fieldSchema.min && payload[field] < fieldSchema.min) {
            return `Field ${field} should have a minimum value of ${fieldSchema.min}`;
        }

        if (fieldSchema.max && payload[field] > fieldSchema.max) {
            return `Field ${field} should have a maximum value of ${fieldSchema.max}`;
        }
    }
    return null
}