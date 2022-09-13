import React, { createContext, Component } from 'react'

export const ThemeContext = createContext()

class ThemeContextProvider extends Component {
    state = {
        light: { bg: '#fff', bdBg: '#fff', txt: 'hsl(235, 19%, 35%)', bxSdw: "1px 2px 12px 3px #ccc", el: 'hsl(209, 23%, 22%)' },
        dark: { bg: 'hsl(207, 26%, 17%)', txt: '#fff', bxSdw: "1px 2px 12px 3px rgb(17 17 33)", el: 'hsl(0, 0%, 100%)' },
        isLightTheme: true
    }

    toggleTheme = () => {
        this.setState({ isLightTheme: !this.state.isLightTheme })
    }

    render() {
        return (
            <ThemeContext.Provider value={{ ...this.state, toggleTheme: this.toggleTheme }}>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}

export default ThemeContextProvider