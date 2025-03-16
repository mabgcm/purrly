import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";

const BuyingProcess = () => {
    return (
        <Fragment>
            <SEO
                titleTemplate="Contact"
                description="Contact page of flone react minimalist eCommerce template."
            />
            <LayoutOne headerTop="invisible">
                <div className="container mt-5">
                    <h2 className="text-center mb-4">Buying Process</h2>
                    <div className="card">
                        <div className="card-body">
                            <p>We aim to make your purchasing experience seamless and satisfactory. Please follow the steps below to complete your purchase:</p>

                            <h5 className="mt-4">Step 1: Select Your Doll</h5>
                            <p>Browse our collection and select the doll you like.</p>

                            <h5 className="mt-4">Step 2: Make Payment</h5>
                            <p>Proceed to make payment for the selected doll.</p>

                            <h5 className="mt-4">Step 3: Receive Production Media</h5>
                            <p>After production is finished, our customer service staff will send you pictures and videos of your doll.</p>

                            <h5 className="mt-4">Step 4: Review and Request Adjustments</h5>
                            <p>Check the images and videos to see if any adjustments are needed.</p>

                            <h5 className="mt-4">Step 5a: No Adjustments Needed</h5>
                            <p>If no changes are necessary, we will proceed to package the doll and send you packaging videos and the tracking number.</p>

                            <h5 className="mt-4">Step 5b: Adjustments Needed</h5>
                            <p>If adjustments are required, we will adjust the doll according to your requirements until you are satisfied.</p>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default BuyingProcess;
