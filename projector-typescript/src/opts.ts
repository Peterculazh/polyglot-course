import cli from 'command-line-args';

export type Opts = {
    args?: string[],
    pwd?: string, // present working directory,
    config?: string,
}

export default function getOpts(): Opts {
    return cli([{
        name: "args",
        defaultOption: true,
        multiple: true,
        type: String,
    }, {
        name: "config",
        alias: "c",
        type: String,
    }, {
        name: "pwd",
        alias: "p",
        type: String,
    }]) as Opts;
}
