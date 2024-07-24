const testData = require("../data/test-data.json");

describe("Limehome API Tests", () => {
  let apiUrl;
  let responseProperties;

  beforeAll(() => {
    apiUrl = testData.apiUrl;
    responseProperties = testData.responseProperties;
  });

  test("Should return 200 as status code", async () => {
    const response = await fetch(apiUrl);
    const body = await response.json();
    expect(response.status).toBe(200);
  });

  test("Should match the expected body", async () => {
    const response = await fetch(apiUrl);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("payload");
    const payload = responseBody.payload;

    //details about the property
    expect(payload).toHaveProperty("id", responseProperties.payload.id);
    expect(payload).toHaveProperty("name", responseProperties.payload.name);
    expect(payload).toHaveProperty(
      "description",
      responseProperties.payload.description
    );

    //location details
    expect(payload).toHaveProperty("location");
    const location = payload.location;
    expect(location).toHaveProperty(
      "countryName",
      responseProperties.payload.location.countryName
    );
    expect(location).toHaveProperty(
      "addressLine1",
      responseProperties.payload.location.addressLine1
    );
    expect(location).toHaveProperty(
      "postalCode",
      responseProperties.payload.location.postalCode
    );
    expect(location).toHaveProperty(
      "countryCode",
      responseProperties.payload.location.countryCode
    );

    //relevant details
    expect(payload).toHaveProperty(
      "house_rules",
      responseProperties.payload.house_rules
    );
  });
});
