import React from "react";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function Footer() {
  return (
    // footer
    <footer
      id="footer"
      className="w-full flex flex-col items-center justify-center paddings  pt-20 pb-20 footer-top"
    >
      <div className="w-full">
        <div className="w-full">
          <div className=" w-full flex items-start justify-between flex-wrap">
            <div className="col-lg-3 col-md-6">
              <div className="footer-info">
                <h3>Nurse Caren.</h3>
                <p className="footer-d">
                  <strong>Phone:</strong> +254 111 201 762
                  <br />
                  <strong>Email:</strong> info@nursecaren.com
                  <br />
                </p>
                <div className="social-links mt-3">
                  <Link href="#" className="facebook">
                    <FacebookIcon sx={{ background: "blue" }} />
                  </Link>
                  <Link href="#" className="linkedin">
                    <LinkedInIcon sx={{ background: "blue" }} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <ChevronRightIcon className="footer-link-icons" />
                  <Link href="/" className="active">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRightIcon className="footer-link-icons" />
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <ChevronRightIcon className="footer-link-icons" />
                  <Link href="">Courses</Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Our Newsletter</h4>
              <p>Subscribe to our newsletter</p>
              <form action="" method="post">
                <input type="email" name="email" />
                <input type="submit" value="Subscribe" />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-bottom w-full">
        <div className="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>Nurse Caren</span>
          </strong>
          . All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
