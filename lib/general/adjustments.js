export function logKalenuxer(info) {
<<<<<<< HEAD
    console.info(`[${new Date().toISOString()}] Info: ${info}`);
=======
    console.info('Info:' + info);
>>>>>>> f9fdf38e588e5d479d000ce70e02cb910c3f5850
}

export function errorKalenuxer(error) {
    console.error('Error:' + error);
}

export function exitKalenuxer(error) {
    if (error) {
        errorKalenuxer(error);
    }
    process.exit(1);
}

export function closeKalenuxer(log) {
    if (log) {
        logKalenuxer(log)
    };
    process.exit(1);
}

export function stopKalenuxer() {
<<<<<<< HEAD
    console.log("Kalenuxer paused...");
}

export function resumeKalenuxer() {
    console.log("Kalenuxer resumed...");
}
=======

}

export function resumeKalenuxer() {

}
>>>>>>> f9fdf38e588e5d479d000ce70e02cb910c3f5850
