import React from 'react'

const Footer = () => {
    return (
        <footer class="pv4 ph3 ph5-m ph6-l mid-gray">
            <small class="f6 db tc">© {new Date().getFullYear()} <b class="ttu">OrdinaSicuro</b>, All Rights Reserved</small>
            <div class="tc mt3">
                {/* <a href="/language/" title="Language" class="f6 dib ph2 link mid-gray dim">Language</a>
                <a href="/terms/"    title="Terms" class="f6 dib ph2 link mid-gray dim">Terms of Use</a> */}
                <a href="/privacy-policy"  title="Privacy" class="f6 dib ph2 link mid-gray dim">Privacy Policy</a>
                <a href="/cookie-policy"  title="Privacy" class="f6 dib ph2 link mid-gray dim">Cookie Policy</a>
            </div>
        </footer>
        
    )
}

export default Footer
