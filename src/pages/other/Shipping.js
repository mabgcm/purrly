import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";

const Shipping = () => {
    return (
        <Fragment>
            <SEO
                titleTemplate="Contact"
                description="Contact page of flone react minimalist eCommerce template."
            />
            <LayoutOne headerTop="invisible">
                <div className="container mt-5">
                    <h2 className="text-center mb-4">Shipping Policy</h2>
                    <div className="card">
                        <div className="card-body">
                            <p>We are committed to delivering your purchase as quickly and discreetly as possible. Please review our shipping policy below:</p>

                            <h5 className="mt-4">Delivery Time:</h5>
                            <ul>
                                <li>Door delivery: 7-15 days</li>
                                <li>Shipping is by air</li>
                                <li>Free worldwide shipping</li>
                            </ul>

                            <h5 className="mt-4">Packaging:</h5>
                            <p>All shipments are packaged discreetly to ensure your privacy.</p>

                            <h5 className="mt-4">Customs:</h5>
                            <p>Our shipping service includes handling of customs, ensuring a smooth delivery process.</p>

                            <h5 className="mt-4">Door to Door:</h5>
                            <p>We provide door-to-door delivery for your convenience.</p>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default Shipping;
