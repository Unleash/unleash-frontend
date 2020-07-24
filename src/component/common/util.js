const dateTimeOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
};
export const formatFullDateTimeWithLocale = (v, locale, tz) => {
    if (tz) {
        dateTimeOptions.timeZone = tz;
    }
    return new Date(v).toLocaleString(locale, dateTimeOptions);
};

export const trim = value => {
    if (value && value.trim) {
        return value.trim();
    } else {
        return value;
    }
};

export function updateWeight(variants, totalWeight) {
    const { remainingPercentage, variableVariants } = variants.reduce(
        ({ remainingPercentage, variableVariants }, v) => {
            if (v.weightType === 'fix') {
                remainingPercentage = Number(remainingPercentage) - Number(v.weight);
            } else {
                variableVariants += 1;
            }
            return { remainingPercentage, variableVariants };
        },
        { remainingPercentage: totalWeight, variableVariants: 0 }
    );

    if (remainingPercentage < 0) {
        throw new Error('The traffic distribution total must equal 100%');
    }

    if (!variableVariants) {
        throw new Error('There must be atleast one variable variant');
    }

    const percentage = parseInt((1 / variableVariants) * remainingPercentage);

    return variants.map(variant => {
        if (variant.weightType !== 'fix') {
            variant.weight = percentage;
        }
        return variant;
    });
}
