import getConfig, { Operation } from '../config';

test("simple print all", () => {
    const config = getConfig({});
    expect(config.operation).toEqual(Operation.Print);
    expect(config.args).toEqual([]);
});

test("print key", () => {
    const config = getConfig({
        args: ["foo"],
    });
    expect(config.operation).toEqual(Operation.Print);
    expect(config.args).toEqual(["foo"]);
});

test("add key value", () => {
    const config = getConfig({
        args: ["add", "foo", "bar"],
    });
    expect(config.operation).toEqual(Operation.Add);
    expect(config.args).toEqual(["foo", "bar"]);
});

test("remove key ", () => {
    const config = getConfig({
        args: ["rm", "foo"],
    });
    expect(config.operation).toEqual(Operation.Remove);
    expect(config.args).toEqual(["foo"]);
});
