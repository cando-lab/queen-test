export function CoupangBanner() {
  return (
    <div className="mx-auto flex w-full max-w-[680px] flex-col items-center px-2 text-center">
      <p className="mb-1 whitespace-nowrap text-center text-[9px] text-slate-500 min-[390px]:text-[10px] sm:text-[11px]">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>

      <div className="w-full max-w-[680px] overflow-hidden rounded-[18px]">
        <div className="aspect-[34/7] w-full">
          <iframe
            src="https://ads-partners.coupang.com/widgets.html?id=974556&template=carousel&trackingCode=AF5575840&subId=&width=680&height=140&tsource="
            title="쿠팡 파트너스 배너"
            width="100%"
            height="100%"
            frameBorder={0}
            scrolling="no"
            loading="lazy"
            referrerPolicy="unsafe-url"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
