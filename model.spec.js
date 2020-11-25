import Model from "./model";

test("instantiation works", () => {
  expect(new Model()).toBeInstanceOf(Model);
});

test("model structure", () => {
  expect(new Model()).toEqual(
    expect.objectContaining({
      $collection: expect.any(Array),
      record: expect.any(Function),
      all: expect.any(Function),
      update: expect.any(Function),
      find: expect.any(Function),
    })
  );
});

describe("The Record Method", () => {
  const heroes = [{ name: "Batman" }, { name: "Flash" }];

  it("can add data to the collection", () => {
    const model = new Model();
    model.record(heroes);
    expect(model.$collection).toEqual(heroes);
  });
  it("gets called when Model is instantiated with data", () => {
    const spy = jest.spyOn(Model.prototype, "record");
    const model = new Model(heroes);
    expect(spy).toHaveBeenCalled();
  });
});
