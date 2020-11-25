import User from "./user.js";

describe("User", () => {
  it("returns the full name", () => {
    const testUser = new User({ firstName: "Toby", lastName: "Okanlawon" });
    expect(testUser.name).toBe("Toby Okanlawon");
  });
});
