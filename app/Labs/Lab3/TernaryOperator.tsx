export default function TernaryOperator() {
    // let loggedIn = true;
    const loggedIn = false;
    const notLoggedIn = true;
    return (
        <div id="wd-ternary-operator">
            <h4>Logged In</h4>
            {loggedIn ? <p>Welcome</p> : <p>Please login</p>}
            <h4>Not Logged In</h4>
            {notLoggedIn ? <p>Welcome</p> : <p>Please login</p>} <hr />
        </div>
    )
}