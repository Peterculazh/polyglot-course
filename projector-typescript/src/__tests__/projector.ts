import { Operation } from "../config";
import Projector from "../projector";

function getData() {
    return {
        projector: {
            "/": {
                "foo": "bar1",
                "fem": "is_great"
            },
            "/foo": {
                "foo": "bar2",
            },
            "/foo/bar": {
                "foo": "bar3",
            },
        }
    };
}

function getProjector(pwd: string, data = getData()): Projector {
    return new Projector({
        args: [] as string[],
        operation: Operation.Print,
        pwd,
        config: "Hello, love",
    }, data);
}


test("getValueAll", () => {
    const proj = getProjector("/foo/bar");
    expect(proj.getValueAll()).toEqual({
        "fem": "is_great",
        "foo": "bar3",
    });
});

test("getValue", () => {
    let proj = getProjector("/foo/bar");
    expect(proj.getValue("foo")).toEqual("bar3");
    proj = getProjector("/foo");
    expect(proj.getValue("foo")).toEqual("bar2");
    expect(proj.getValue("fem")).toEqual("is_great");
});

test("setValue", () => {
    let data = getData();
    let proj = getProjector("/foo/bar", data);

    proj.setValue("foo", "baz");
    expect(proj.getValue("foo")).toEqual("baz");

    proj.setValue("fem", "better_than_great");
    expect(proj.getValue("fem")).toEqual("better_than_great");

    proj = getProjector("/", data);
    expect(proj.getValue("fem")).toEqual("is_great");
});

test("removeValue", () => {
    const proj = getProjector("/foo/bar");
    proj.removeValue("fem");
    expect(proj.getValue("fem")).toEqual("is_great");

    proj.removeValue("foo");
    expect(proj.getValue("foo")).toEqual("bar2");
});
