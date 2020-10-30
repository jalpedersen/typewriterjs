

export type TypewriterCommand = {
    text?: string;
    stop?: boolean;
    append?: boolean;
    remove?: any;  //number of chars to remove or true for all
    delay?: number; //delay before starting (milliseconds)
    speed?: number; //typing speed (milliseconds)
    removeSpeed?: number;
    pause?: number; //ms to sleep before starting
    variance?: number; //max variance to add/remove from speed
}
export type TypewriterOpts = {
    commands?: TypewriterCommand[];
    speed?: number; //typing speed
    variance?: number; //max variance to add/remove from speed
}

const sleep = async (timeout: number): Promise<any> => {
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
        const { commands, variance, speed } = this.options;
        const textElement = document.createElement("span");
        textElement.className = "typewriter-content";
        element.appendChild(textElement);
        const cursor = document.createElement("span");
        cursor.className = "typewriter-cursor";
        element.appendChild(cursor);
        while (this.running) {
            for (const idx in commands) {
                const cmd = commands[idx];
                const content = textElement.innerHTML;
                const cVar = cmd.variance || variance || 0;
                const cSpeed = cmd.speed || speed || 250;
                const rSpeed = cmd.removeSpeed || 100;

                const remove = async (toRemove: number) => {
                    const deleteSpeed = rSpeed + ((Math.random() - 0.5) * cVar);
                    for (var i = 0; i < toRemove; i++) {
                        const newContent = content.substring(0, content.length - i - 1);
                        textElement.innerHTML = newContent;
                        await sleep(Math.max(0, deleteSpeed));
                    }
                }
                if (cmd.stop) {
                    return;
                }
                if (cmd.pause) {
                    await sleep(cmd.pause)
                }
                if (cmd.remove) {
                    let toRemove = 0;
                    if (cmd.remove == true) {
                        toRemove = content.length;
                    } else {
                        toRemove = cmd.remove;
                    }
                    await remove(toRemove);
                }
                if (cmd.text) {
                    const typeSpeed = cSpeed + ((Math.random() - 0.5) * cVar);
                    let endOfCommon = 0;
                    if (!cmd.append) {
                        for (let idx = 0; idx < content.length; idx++) {
                            if (content.charAt(idx) == cmd.text.charAt(idx)) {
                                endOfCommon = endOfCommon + 1;
                            } else {
                                break;
                            }
                        }
                        await remove(content.length - endOfCommon);
                    }
                    const updatedContent = textElement.innerHTML;
                    for (var i = endOfCommon; i < cmd.text.length; i++) {
                        textElement.innerHTML = updatedContent + cmd.text.substring(endOfCommon, i + 1);
                        await sleep(Math.max(0, typeSpeed));
                    }
                }
            }
        }


    }


}