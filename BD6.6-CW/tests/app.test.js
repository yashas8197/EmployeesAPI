const request = require("supertest");
const http = require("http");
const { getAllEmployees, getEmployeeById } = require("../controllers/index");
const { app } = require("../index");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API EndPoint tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("/employees Should  return all employees", async () => {
    let mockEmployees = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ];

    getAllEmployees.mockReturnValue(mockEmployees);

    let result = await request(server).get("/employees");
    expect(result.statusCode).toBe(200);
    expect(result.body.employees.length).toBe(3);
    expect(result.body).toEqual({ employees: mockEmployees });
  });

  it("/employees/details/:id Should return employee of a specific id", async () => {
    let mockEmployee = {
      employeeId: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      departmentId: 1,
      roleId: 1,
    };

    getEmployeeById.mockReturnValue(mockEmployee);

    const result = await request(server).get("/employees/details/1");
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({ employee: mockEmployee });
  });
});

describe("Controller function test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return all employees", () => {
    let mockEmployees = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ];

    getAllEmployees.mockReturnValue(mockEmployees);
    let result = getAllEmployees();
    expect(result).toEqual(mockEmployees);
    expect(result.length).toBe(3);
  });
});
