export function sanitizeTitle(raw, { maxLength = 80 } = {}) {
    if (typeof raw !== 'string') return '';

    let title = raw.trim();

    title = title.replace(/\s+/g, ' ');

    title = title.replace(/[^\x20-\x7e]/g, '');

    if (title.length > maxLength) {
        title = title.slice(0, maxLength);
    }

    return title;
}