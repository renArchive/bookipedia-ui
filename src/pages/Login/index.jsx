import './styles.css';

function getLabel (type) {
    switch(type) {
        case 'signup':
            return 'Signup'
        case 'reset':
            return 'Reset Password'
        default:
            return 'Login'
    }
}

function Login ({type = 'login'}) {
    const label = getLabel(type);
    return (
        <div className='login_container'>
            <div className='login_div'>
                {label}
            </div>
            <form>
                <div>
                  <input type="email" placeholder="email"/>
                </div>
                <div>
                  <input type="password" placeholder="password"/>
                </div>
                <button>{label}</button>

                {type === 'login' && (
                    <>
                        <div>
                            <label>Forgot <a href="/reset-password">password</a>?</label>
                        </div>
                        <div>
                            <label>Don't have an account?  <a href="/signup">Signup</a></label>
                        </div>
                    </>
                )}

            </form>
        </div>
    )
}

export default Login;