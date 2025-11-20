import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  vi: {
    translation: {
      seo: {
        title: 'Thuê xe Sài Gòn - Phan Thiết - Mũi Né - Nha Trang - Đà Lạt | 0844232144',
        description: 'Dịch vụ đặt xe riêng tuyến Sài Gòn - Phan Thiết - Mũi Né - Đà Lạt - Nha Trang. Đưa đón tận nơi, tài xế kinh nghiệm, phục vụ hơn 34 tỉnh thành. Gọi 0844232144 để được tư vấn nhanh.'
      },
      header: {
        brand: 'Thuê Xe Riêng Trọn Gói Giá Rẻ'
      },
      nav: {
        booking: 'Đặt xe',
        pricing: 'Bảng giá',
        routes: 'Tuyến đường',
        faq: 'Hỏi đáp',
        contact: 'Liên hệ'
      },
      lang: {
        vi: 'VI',
        en: 'EN'
      },
      hero: {
        titlePrefix: 'Đặt xe riêng',
        titleHighlight: 'Sài Gòn – Phan Thiết – Mũi Né – Nha Trang',
        subtitle: 'Xe riêng đưa đón tận nơi, phục vụ hơn {{count}} tỉnh thành, khởi hành linh hoạt 24/7. Tài xế nhiều kinh nghiệm, xe sạch – máy lạnh – wifi, giá trọn gói rõ ràng.',
        badges: [
          'Đưa đón tận cửa',
          'Xe riêng 4–7 chỗ & 16 chỗ',
          'Tuyến Sài Gòn – Phan Thiết – Mũi Né – Nha Trang',
          'Hỗ trợ hơn 34 tỉnh thành'
        ],
        ctaBook: 'Đặt xe ngay',
        ctaCall: 'Gọi 0844 232 144',
        note: 'Đặt trước càng sớm, càng dễ chọn giờ đẹp & giữ chỗ ngày cao điểm (cuối tuần, lễ, Tết).'
      },
      benefits: {
        title: 'Ưu điểm dịch vụ xe riêng',
        cardTitle: 'Vì sao nên chọn xe riêng tuyến Sài Gòn – Phan Thiết – Mũi Né – Nha Trang?',
        items: [
          'Đón tận nơi: tại nhà, khách sạn, sân bay, bến xe…',
          'Không ghép khách: 1 xe chỉ phục vụ nhóm của bạn.',
          'Giờ giấc linh hoạt: chủ động giờ khởi hành & điểm dừng.',
          'Tài xế kinh nghiệm: rành đường, hỗ trợ hành lý chu đáo.',
          'Xe mới, sạch: máy lạnh mát, ghế ngã thoải mái, có nước suối khăn lạnh.'
        ],
        tags: [
          'Tour du lịch gia đình',
          'Đi công tác',
          'Đón – tiễn sân bay',
          'Khách đoàn'
        ]
      },
      pricing: {
        title: 'Bảng giá tham khảo',
        note: 'Giá có thể thay đổi theo thời điểm (cuối tuần, lễ Tết, giờ đêm, điểm đón trả cụ thể). Vui lòng gọi 0844 232 144 hoặc gửi form để nhận báo giá chính xác.',
        cols: {
          route: 'Tuyến',
          car4: 'Xe 4–5 chỗ',
          car7: 'Xe 7 chỗ',
          car16: 'Xe 16 chỗ'
        },
        rows: [
          'Sài Gòn ⇆ Phan Thiết',
          'Sài Gòn ⇆ Mũi Né',
          'Sài Gòn ⇆ Nha Trang'
        ],
        contact: 'Liên hệ'
      },
      routes: {
        titleMain: 'Tuyến Sài Gòn – Phan Thiết – Mũi Né – Nha Trang',
        cardTitle: 'Các tuyến chính',
        lines: [
          'TP.HCM (Sài Gòn) ⇆ Phan Thiết',
          'TP.HCM (Sài Gòn) ⇆ Mũi Né',
          'TP.HCM (Sài Gòn) ⇆ Nha Trang',
          'TP.HCM (Sài Gòn) ⇆ Cam Ranh – Sân bay Cam Ranh',
          'Đón trả linh hoạt dọc quốc lộ 1A và cao tốc Dầu Giây – Phan Thiết – Vĩnh Hảo'
        ],
        desc: 'Chúng tôi nhận đón – trả tận nơi tại nhà, khách sạn, resort, homestay, sân bay, bến xe… theo yêu cầu của quý khách.',
        titleProvince: 'Phục vụ hơn 34 tỉnh thành',
        provinceIntro: 'Dịch vụ xe riêng kết nối TP.HCM – Phan Thiết – Mũi Né – Nha Trang với nhiều tỉnh thành lân cận, hỗ trợ đưa đón khách từ/đến:',
        provinces: [
          'TP.HCM',
          'Bình Thuận (Phan Thiết, Mũi Né)',
          'Khánh Hòa (Nha Trang, Cam Ranh)',
          'Ninh Thuận',
          'Lâm Đồng (Đà Lạt)',
          'Đồng Nai',
          'Bình Dương',
          'Bà Rịa – Vũng Tàu',
          'Long An',
          'Tiền Giang',
          'Bến Tre',
          'Vĩnh Long',
          'Cần Thơ',
          'Đồng Tháp',
          'Trà Vinh',
          'Sóc Trăng',
          'Kiên Giang',
          'Hậu Giang'
        ],
        provinceNote: 'Nếu quý khách cần đón hoặc trả khách tại tỉnh/thành khác, vui lòng gọi 0844 232 144 để được tư vấn lịch trình & chi phí chi tiết.'
      },
      booking: {
        title: 'Đặt xe riêng nhanh',
        intro: 'Vui lòng điền thông tin dưới đây, bộ phận điều hành sẽ liên hệ lại qua điện thoại/Zalo để xác nhận & báo giá chi tiết.',
        fullName: 'Họ và tên *',
        fullNamePlaceholder: 'Nguyễn Văn A',
        phone: 'Số điện thoại *',
        phonePlaceholder: '0844 232 144',
        email: "Email *",
        route: 'Tuyến đường *',
        routeOptions: {
          placeholder: '-- Chọn tuyến --',
          sgPt: 'Sài Gòn ⇆ Phan Thiết',
          sgMn: 'Sài Gòn ⇆ Mũi Né',
          sgNt: 'Sài Gòn ⇆ Nha Trang',
          sgOther: 'Sài Gòn ⇆ Tỉnh khác',
          other: 'Tuyến khác (ghi chú)'
        },
        carType: 'Loại xe *',
        carTypeOptions: {
          placeholder: '-- Chọn loại xe --',
          c4: 'Xe 4–5 chỗ',
          c7: 'Xe 7 chỗ',
          c16: 'Xe 16 chỗ',
          c29: 'Xe 29 chỗ'
        },
        pickup: 'Điểm đón *',
        pickupPlaceholder: 'VD: Quận 1, TP.HCM',
        dropoff: 'Điểm trả *',
        dropoffPlaceholder: 'VD: Mũi Né, Bình Thuận',
        adult: "Số lượng người lớn",
        child: "Số lượng trẻ em",
        adultPlaceholder: "VD: 2",
        childPlaceholder: "VD: 1",
        date: 'Ngày đi *',
        time: 'Giờ dự kiến *',
        roundTrip: 'Khứ hồi',
        returnDate: 'Ngày về *',
        returnTime: 'Giờ dự kiến về *',
        note: 'Ghi chú thêm',
        notePlaceholder: 'Số lượng khách, có trẻ em, hành lý nhiều, yêu cầu ghế trẻ em...',
        submit: 'Gửi yêu cầu đặt xe',
        afterSubmit: 'Sau khi gửi form, quý khách vui lòng giữ máy. Admin sẽ gọi/zalo lại trong thời gian sớm nhất qua số 0844 232 144.',
        alert: 'Đã gửi yêu cầu đặt xe!\nAdmin sẽ liên hệ lại qua số hoặc Zalo bạn cung cấp.'
      },
      contactSection: {
        title: 'Liên hệ nhanh: Điện thoại, Messenger, Zalo',
        phoneLabel: 'Điện thoại:',
        messenger: 'Chat Messenger',
        zalo: 'Chat Zalo',
        note: 'Bạn có thể bấm trực tiếp vào nút Messenger hoặc Zalo để mở cuộc trò chuyện. Vui lòng cập nhật lại đường dẫn Messenger đúng với fanpage/cá nhân của bạn (thay yourpageid trong link).'
      },
      faq: {
        title: 'Câu hỏi thường gặp',
        items: [
          {
            q: 'Giá xe riêng Sài Gòn – Phan Thiết – Mũi Né – Nha Trang tính như thế nào?',
            a: 'Giá phụ thuộc vào tuyến đường, loại xe, thời gian đi (ngày thường/cuối tuần/lễ Tết) và điểm đón trả cụ thể. Bạn vui lòng gọi 0844 232 144 hoặc gửi form, admin sẽ báo giá chính xác.'
          },
          {
            q: 'Tôi có thể đặt xe đi nhiều ngày, nhiều điểm dừng được không?',
            a: 'Được. Xe riêng linh hoạt theo lịch trình của bạn (tour gia đình, nhóm bạn, công tác). Hãy ghi rõ lịch trình tại phần ghi chú hoặc trao đổi trực tiếp với tài xế/điều hành.'
          },
          {
            q: 'Có nhận đón tại sân bay, bến xe không?',
            a: 'Có. Chúng tôi nhận đón – tiễn sân bay (Tân Sơn Nhất, Cam Ranh...), bến xe, ga tàu... Bạn chỉ cần cung cấp giờ đến/chuyến bay để tài xế canh giờ phù hợp.'
          },
          {
            q: 'Tôi muốn xuất hóa đơn VAT thì sao?',
            a: 'Có hỗ trợ xuất hóa đơn VAT khi cần. Vui lòng thông báo trước với điều hành để được tư vấn chi tiết.'
          }
        ]
      },
      footer: {
        text1: 'Dịch vụ đặt xe riêng Sài Gòn – Phan Thiết – Mũi Né – Nha Trang. Hotline/Zalo: 0844 232 144.',
        text2: 'Website tối ưu SEO với các từ khóa: đặt xe riêng Sài Gòn Phan Thiết, xe riêng Sài Gòn Mũi Né, xe riêng Sài Gòn Nha Trang, xe đưa đón tận nơi, xe du lịch riêng 4–7–16 chỗ.'
      }
    }
  },
  en: {
    translation: {
      seo: {
        title: 'Private car Saigon - Phan Thiet - Mui Ne - Nha Trang - Da Lat | +84844232144',
        description: 'Private car service from Saigon to Phan Thiet - Mui Ne - Da Lat - Nha Trang. Door-to-door pickup, experienced drivers, serving 34+ provinces. Call 0844232144 for quick support.'
      },
      header: {
        brand: 'Private Car SG ⇆ Phan Thiet • Mui Ne • Nha Trang'
      },
      nav: {
        booking: 'Book a car',
        pricing: 'Pricing',
        routes: 'Routes',
        faq: 'FAQ',
        contact: 'Contact'
      },
      lang: {
        vi: 'VI',
        en: 'EN'
      },
      hero: {
        titlePrefix: 'Private car booking',
        titleHighlight: 'Saigon – Phan Thiet – Mui Ne – Nha Trang',
        subtitle: 'Door-to-door private car service, covering over {{count}} provinces, flexible departures 24/7. Experienced drivers, clean cars with A/C & wifi, clear and fixed pricing.',
        badges: [
          'Door-to-door pickup',
          'Private cars 4–7–16 seats',
          'Saigon – Phan Thiet – Mui Ne – Nha Trang route',
          'Serving 34+ provinces'
        ],
        ctaBook: 'Book now',
        ctaCall: 'Call 0844 232 144',
        note: 'Book early to secure good time slots & avoid fully booked days on weekends and holidays.'
      },
      benefits: {
        title: 'Why choose our private car service?',
        cardTitle: 'Why choose private car Saigon – Phan Thiet – Mui Ne – Nha Trang?',
        items: [
          'Door-to-door pickup: home, hotel, airport, bus station…',
          'No sharing: the whole car is for your group only.',
          'Flexible time: you control departure time & stops.',
          'Experienced drivers: know the routes well, helpful with luggage.',
          'Clean & new cars: cool A/C, comfy seats, free water & tissues.'
        ],
        tags: [
          'Family trips',
          'Business trips',
          'Airport transfer',
          'Group travel'
        ]
      },
      pricing: {
        title: 'Reference pricing',
        note: 'Prices may vary depending on time (weekends, holidays, night hours) and exact pickup/drop-off locations. Please call 0844 232 144 or submit the form to get an exact quote.',
        cols: {
          route: 'Route',
          car4: '4–5 seat car',
          car7: '7 seat car',
          car16: '16 seat car'
        },
        rows: [
          'Saigon ⇆ Phan Thiet',
          'Saigon ⇆ Mui Ne',
          'Saigon ⇆ Nha Trang'
        ],
        contact: 'Contact'
      },
      routes: {
        titleMain: 'Saigon – Phan Thiet – Mui Ne – Nha Trang route',
        cardTitle: 'Main routes',
        lines: [
          'Ho Chi Minh City (Saigon) ⇆ Phan Thiet',
          'Ho Chi Minh City (Saigon) ⇆ Mui Ne',
          'Ho Chi Minh City (Saigon) ⇆ Nha Trang',
          'Ho Chi Minh City (Saigon) ⇆ Cam Ranh – Cam Ranh Airport',
          'Flexible pickup/drop-off along Highway 1A and Dau Giay – Phan Thiet – Vinh Hao expressway'
        ],
        desc: 'We offer door-to-door pickup at homes, hotels, resorts, homestays, airports, bus stations… as requested.',
        titleProvince: 'Serving 34+ provinces',
        provinceIntro: 'Private car service connecting Ho Chi Minh City – Phan Thiet – Mui Ne – Nha Trang with many nearby provinces, supporting pickup/drop-off from/to:',
        provinces: [
          'Ho Chi Minh City',
          'Binh Thuan (Phan Thiet, Mui Ne)',
          'Khanh Hoa (Nha Trang, Cam Ranh)',
          'Ninh Thuan',
          'Lam Dong (Da Lat)',
          'Dong Nai',
          'Binh Duong',
          'Ba Ria – Vung Tau',
          'Long An',
          'Tien Giang',
          'Ben Tre',
          'Vinh Long',
          'Can Tho',
          'Dong Thap',
          'Tra Vinh',
          'Soc Trang',
          'Kien Giang',
          'Hau Giang'
        ],
        provinceNote: 'If you need pickup/drop-off in other provinces/cities, please call 0844 232 144 for detailed schedule & pricing.'
      },
      booking: {
        title: 'Quick booking',
        intro: 'Please fill in the form below. Our operator will contact you via phone/Zalo to confirm and give a detailed quote.',
        fullName: 'Full name *',
        fullNamePlaceholder: 'e.g. John Nguyen',
        phone: 'Phone number *',
        phonePlaceholder: '0844 232 144',
        email: "Email *",
        route: 'Route *',
        routeOptions: {
          placeholder: '-- Select route --',
          sgPt: 'Saigon ⇆ Phan Thiet',
          sgMn: 'Saigon ⇆ Mui Ne',
          sgNt: 'Saigon ⇆ Nha Trang',
          sgOther: 'Saigon ⇆ Other province',
          other: 'Other route (note below)'
        },
        carType: 'Car type *',
        carTypeOptions: {
          placeholder: '-- Select car type --',
          c4: '4–5 seat car',
          c7: '7 seat car',
          c16: '16 seat minibus',
          c29: '29 seat bus'
        },
        pickup: 'Pickup location *',
        pickupPlaceholder: 'e.g. District 1, HCMC',
        dropoff: 'Drop-off location *',
        dropoffPlaceholder: 'e.g. Mui Ne, Binh Thuan',
        adult: "Adults",
        child: "Children",
        adultPlaceholder: "e.g. 2",
        childPlaceholder: "e.g. 1",
        date: 'Departure date *',
        time: 'Estimated time *',
        roundTrip: "Round-trip?",
        returnDate: "Return date",
        returnTime: "Return time",
        note: 'Additional note',
        notePlaceholder: 'Number of passengers, kids, lots of luggage, child seat request...',
        submit: 'Send booking request',
        afterSubmit: 'After sending, please keep your phone nearby. Admin will contact you soon via the phone/Zalo you provided.',
        alert: 'Booking request sent!\nWe will contact you soon via phone or Zalo.'
      },
      contactSection: {
        title: 'Quick contact: Phone, Messenger, Zalo',
        phoneLabel: 'Phone:',
        messenger: 'Chat via Messenger',
        zalo: 'Chat via Zalo',
        note: 'You can click directly on Messenger or Zalo buttons to open a chat. Please update the Messenger link to match your page/profile (replace yourpageid in the URL).'
      },
      faq: {
        title: 'Frequently asked questions',
        items: [
          {
            q: 'How is the price for Saigon – Phan Thiet – Mui Ne – Nha Trang private car calculated?',
            a: 'The price depends on route, car type, travel time (weekday/weekend/holiday) and exact pickup/drop-off points. Please call 0844 232 144 or submit the form for an exact quote.'
          },
          {
            q: 'Can I book a multi-day trip with many stops?',
            a: 'Yes. The private car can follow your own itinerary (family trip, group of friends, business trip). Please describe your plan in the note field or talk directly with our driver/operator.'
          },
          {
            q: 'Do you offer airport and bus station pickup?',
            a: 'Yes. We provide transfers from/to airports (Tan Son Nhut, Cam Ranh...), bus stations, train stations... Just give us your arrival time/flight number so the driver can arrange pickup time.'
          },
          {
            q: 'Do you issue VAT invoices?',
            a: 'Yes, VAT invoices are available upon request. Please inform us in advance so we can advise you in detail.'
          }
        ]
      },
      footer: {
        text1: 'Private car service Saigon – Phan Thiet – Mui Ne – Nha Trang. Hotline/Zalo: 0844 232 144.',
        text2: 'SEO-optimized website for keywords like: private car Saigon Phan Thiet, private car Saigon Mui Ne, private car Saigon Nha Trang, door-to-door transfer, private 4–7–16 seat car.'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi',
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
