const AboutItem = ({ headText, paraText, imgPath, imgAlt }) => {
  return (
    <li className="w-full flex flex-wrap justify-evenly mb-16 2xl:mb-20">
      <div>
        <img
          src={imgPath}
          alt={imgAlt}
          className="max-w-[120px] 2xl:max-w-[180px]"
        />
      </div>
      <div className="w-full max-w-2xl 2xl:max-w-3xl">
        <h3 className="text-3xl 2xl:text-5xl font-fira font-bold mb-4">
          {headText}
        </h3>
        <p className="text-lg 2xl:text-2xl">{paraText}</p>
      </div>
    </li>
  );
};

export default AboutItem;
