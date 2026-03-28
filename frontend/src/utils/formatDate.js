// Helper to format date eg: "26 June 2026 - Wednesday"
const formatDate = (d) => {
    return d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        weekday: "long",
    });
};

export default formatDate;