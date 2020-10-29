

export type TypewriterCommand = {
    text?: string;
    remove?: any;  //number of chars to remove or true for all
    delay?: number; //delay before starting
    speed?: number; //typing speed
    variance?: number; //max variance to add/remove from speed
}
export type TypewriterOpts = {
    commands?: TypewriterCommand[];
    speed?: number; //typing speed
    variance?: number; //max variance to add/remove from speed
}

const sleep = async (timeout: number):Promise<any> => {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });

}

export class Typewriter {
    options: TypewriterOpts;
    running = true;
    constructor(options: TypewriterOpts) {
        //Load styling (added to script tag in header by magic...)
        require("./style/typewriter.css");

        this.options = options;
    }

    async init(element: HTMLElement) {
        const {commands, variance, speed} = this.options;
        while (this.running) {
            for (const idx in commands) {
                const cmd = commands[idx];
                const content = element.innerHTML;
                const cVar = cmd.variance || variance || 0;
                const cSpeed = cmd.speed || speed || 250;
                const typeSpeed = cSpeed + ((Math.random() - 0.5) * cVar);
                if (cmd.remove) {
                    let toRemove = 0;
                    if (cmd.remove == true) {
                        toRemove = content.length;
                    } else {
                        toRemove = cmd.remove;
                    }
                    for (var i = 0; i < toRemove; i++) {
                        const newContent = content.substring(0, content.length - i - 1);
                        element.innerHTML = newContent;
                        await sleep(Math.max(0, typeSpeed));
                    }
                } else if (cmd.text) {
                    for (var i = 0; i < cmd.text.length; i++) {
                        element.innerHTML = content + cmd.text.substring(0, i + 1);
                        await sleep(Math.max(0, typeSpeed));
                    }
                }
            }
        }
        

    }


}