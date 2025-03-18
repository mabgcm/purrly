const HeaderSocial = () => {
  return (
    <div
      className=""
      style={{
        display: 'flex', // Use Flexbox to display elements horizontally
        justifyContent: 'start', // Center items horizontally
        alignItems: 'center', // Align items vertically in the center
        marginTop: '50px'
      }}
    >
      <ul
        style={{
          display: 'flex', // Use Flexbox to display list items horizontally
          padding: 0,
          margin: 0,
          listStyle: 'none'
        }}
      >
        <li style={{ marginRight: '30px' }}>
          <a
            className="facebook"
            href="//www.facebook.com/profile.php?id=61573975573931"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '25px', color: '#3b5999' }}
          >
            <i className="fa fa-facebook" />
          </a>
        </li>



        <li style={{ marginRight: '30px' }}>
          <a
            className="instagram"
            href="//www.instagram.com/purrly_baby/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '25px', color: '#e4405f' }}
          >
            <i className="fa fa-instagram" />
          </a>
        </li>

        <li style={{ marginRight: '30px' }}>
          <a
            className="tiktok"
            href="//www.tiktok.com/@purrly.baby"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '25px', color: '#000000' }}
          >
            <i className="fab fa-tiktok" />
          </a>
        </li>

        <li style={{ marginRight: '0' }}>
          <a
            className="pinterest"
            href="//ca.pinterest.com/purrlybaby/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '25px', color: '#bd081c' }}
          >
            <i className="fa fa-pinterest-p" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default HeaderSocial;