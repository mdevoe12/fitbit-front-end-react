const loggedIn = require("./loggedIn")

// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new loggedIn.default({ token: ")" })
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})
