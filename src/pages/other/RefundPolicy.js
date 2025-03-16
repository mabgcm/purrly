import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
const RefundPolicy = () => {
    return (
        <Fragment>
            <SEO
                titleTemplate="Contact"
                description="Contact page of flone react minimalist eCommerce template."
            />
            <LayoutOne headerTop="invisible">
                <div className="container mt-5">
                    <h2 className="text-center mb-4">Refund Policy</h2>
                    <div className="card">
                        <div className="card-body">
                            <p>Thank you for choosing our products. We strive to ensure your satisfaction with every purchase. To help clarify our refund policy, please review the guidelines below:</p>

                            <h5 className="mt-4">Quality-Related Refunds:</h5>
                            <ul>
                                <li>If you wish to request a refund due to the quality of the product, you will be responsible for covering the shipping fees.</li>
                                <li>Prior to shipping, we will provide videos for you to verify the quality of the doll. If you require any adjustments, such as cutting the hair shorter, we will make the necessary changes until you are satisfied. Once you approve the quality and any adjustments, we will ship the doll promptly.</li>
                            </ul>

                            <h5 className="mt-4">Non-Quality-Related Refunds:</h5>
                            <ul>
                                <li>Refunds are not supported for reasons unrelated to the quality of the product. This includes but is not limited to personal preference, change of mind, or any other non-quality issues.</li>
                            </ul>

                            <h5 className="mt-4">Used Dolls:</h5>
                            <ul>
                                <li>Refunds are strictly not supported once the doll has been used.</li>
                            </ul>

                            <p className="mt-4">We appreciate your understanding and cooperation. If you have any further questions or require assistance, please do not hesitate to contact our customer service team.</p>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default RefundPolicy;
