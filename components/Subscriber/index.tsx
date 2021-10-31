import React from 'react'

function Subscriber() {
    return (
        <section className="subscription-area section_gap">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="section-title text-center">
                            <h2>Subscribe for Our Newsletter</h2>
                            <span>We won’t send any kind of spam</span>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div id="mc_embed_signup">
                            <form
                                target="_blank"
                                action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01"
                                className="subscription relative"
                            >
                                <input
                                    type="email"
                                    name="EMAIL"
                                    placeholder="Email address"
                                    required
                                />
                                <button type="submit" className="newsl-btn">
                                    Get Started
                                </button>
                                <div className="info" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Subscriber
