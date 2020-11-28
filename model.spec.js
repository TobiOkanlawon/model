import Model from "./model";

function createModel(data = [], options = {}) {
  return new Model({
    ...options,
    data,
  });
}

test("instantiation works", () => {
  expect(createModel()).toBeInstanceOf(Model);
});

test("model structure", () => {
  expect(createModel()).toEqual(
    expect.objectContaining({
      $collection: expect.any(Array),
      $options: expect.any(Object),
      record: expect.any(Function),
      all: expect.any(Function),
      update: expect.any(Function),
      find: expect.any(Function),
      delete: expect.any(Function),
    })
  );
});

describe("Customisations of the model", () => {
  test("Can change the options of a model", () => {
    const model = createModel([], {
      primaryKey: "name",
    });
    expect(model.$options.primaryKey).toBe("name");
  });
  it("should be id as the default primaryKey", () => {
    const model = createModel();
    expect(model.$options.primaryKey).toBe("id");
  });
});

describe("The Record Method", () => {
  const heroes = [{ id: 1, name: "Batman" }, { name: "Flash" }];

  it("can add data to the collection", () => {
    const model = createModel();
    model.record(heroes);
    expect(model.$collection).toEqual([
      heroes[0],
      { id: expect.any(Number), name: heroes[1].name },
    ]);
  });
  it("gets called when Model is instantiated with data", () => {
    const spy = jest.spyOn(Model.prototype, "record");
    const model = createModel(heroes);
    expect(spy).toHaveBeenCalled();
  });
});

describe("The All Method", () => {
  const heroes = [
    { id: 1, name: "Batman" },
    { id: 2, name: "Flash" },
  ];
  test("the all method returns all data when available", () => {
    const model = createModel(heroes);
    expect(model.all()).toEqual(heroes);
  });
  test("the all method returns an empty model", () => {
    const model = createModel();
    expect(model.all()).toEqual([]);
  });
  test("it preserves the data of the original model", () => {
    const model = createModel([{ name: "Toby" }]);
    const data = model.all();
    data[0].name = "Michael";
    expect(model.all()).not.toBe(data);
  });
});

describe("The Find Method", () => {
  const heroes = [
    { id: 1, name: "Batman" },
    { id: 2, name: "Flash" },
  ];

  it("returns null if it cannot find the data", () => {
    const model = createModel();
    expect(model.find(1)).toBe(null);
  });
  it("returns the true", () => {
    const model = createModel(heroes);
    expect(model.find(1)).toEqual(heroes[0]);
  });
});

describe("The Update Method", () => {
  const heroes = [{ id: 1, name: "Batman" }];
  let model;

  beforeEach(() => {
    const dataset = JSON.parse(JSON.stringify(heroes));
    model = createModel(dataset);
  });

  test("an entry by id", () => {
    model.update(1, { name: "Joker" });
    expect(model.find(1).name).toBe("Joker");
  });
  test("extend an entry by id", () => {
    model.update(1, { cape: true });
    expect(model.find(1)).toEqual(
      expect.objectContaining({
        name: "Batman",
        cape: true,
      })
    );
  });
  test("returns false if there is no entry with that key", () => {
    expect(model.update(2, { name: "Toby" })).toBe(false);
  });
});

describe("The Delete Method", () => {
  const dataset = [{ id: 1, name: "Superman" }];
  let model;
  beforeEach(() => {
    model = createModel(JSON.parse(JSON.stringify(dataset)));
  });
  test("should delete an entry if it exists", () => {
    expect(model.delete(1)).toBe(true);
    expect(model.all()).toEqual([]);
  });
  test("should return false if the entry does not exist ", () => {
    expect(model.delete(2)).toBe(false);
  });
});
