import { Modal } from 'antd'
import React from 'react'

export const PolicyModal = ({ visiblePolicyModal, handleClosePolicyModal }) => {
    return (
        <Modal
            open={visiblePolicyModal}
            onCancel={handleClosePolicyModal}
            footer={false}
            title={
                <div className="text-center text-xl text-teal-500 font-bold">
                    QUY ĐỊNH KHI ĐẶT GIỮ VẮC XIN
                </div>
            }
            width={1000}
            style={{ top: 20, maxHeight: '80vh' }}
            styles={{
                body: {
                    overflowY: 'auto',
                    maxHeight: '80vh',
                    height: '80vh',
                },
            }}
        >
            <div className="text-base">
                <h2 className="font-bold">ĐỊNH NGHĨA</h2>
                <h3 className="font-semibold">*Người mua</h3>
                <ul>
                    <li>
                        - Là người đại diện thực hiện đăng ký thông tin và thanh toán cho bản thân
                        hoặc người thân của mình.
                    </li>
                    <li>
                        - Trung tâm sẽ liên hệ với người mua để xác nhận chi tiết thông tin về ngày
                        giờ và địa điểm tiêm chủng dựa theo mã đăng ký khách hàng được cung cấp ngay
                        sau khi hoàn tất đặt mua hoặc/và thanh toán. Mỗi đơn đặt giữ vắc xin sẽ nhận
                        được một mã đăng ký.
                    </li>
                    <li>
                        - Người mua phải là công dân Việt Nam hoặc người nước ngoài sinh sống hợp
                        pháp tại Việt Nam trên 15 tuổi.
                    </li>
                </ul>
                <h3 className="font-semibold">*Người tiêm</h3>
                <ul>
                    <li>
                        - Là người sẽ được tiêm loại vắc xin mà người mua đã đặt giữ nếu đạt đủ các
                        tiêu chuẩn quy định về sức khỏe.
                    </li>
                    <li>
                        - Trung tâm chỉ thực hiện tiêm chủng cho người tiêm có thông tin cá nhân
                        trùng khớp hoàn toàn với thông tin đã đặt giữ và có mối quan hệ theo quy
                        định với người mua.
                    </li>
                    <li>
                        - Nếu người tiêm dưới 14 tuổi, các thông tin về số điện thoại, email, địa
                        chỉ, nghề nghiệp và đơn vị công tác của người tiêm là thông tin đăng ký của
                        người giám hộ hợp pháp.
                    </li>
                    <li>
                        - Tuỳ theo loại vắc xin đặt giữ, người tiêm có thể được yêu cầu trả lời một
                        số câu hỏi sàng lọc trước khi hoàn tất đặt giữ vắc xin.
                    </li>
                </ul>
                <h2 className="font-bold">QUY ĐỊNH ĐĂNG KÝ</h2>
                <ul>
                    <li>
                        - Một người mua được đăng ký nhiều lần không giới hạn số người tiêm. Người
                        mua có thể đặt giữ vắc xin cho tối đa 1 người tiêm trong một đơn hàng trên
                        ứng dụng Trung tâm hoặc tối đa 5 người tiêm trong một đơn hàng trên website
                        vax.Trung tâm.vn, bao gồm cả bản thân người mua.
                    </li>
                    <li>
                        - Người tiêm chỉ được đặt giữ tối đa 3 loại “Vắc xin đặt giữ theo yêu cầu”:
                        mỗi khách hàng chỉ được đặt mua 01 mũi vắc xin cho mỗi loại, và được đặt mua
                        tối đa 03 loại vắc xin.
                    </li>
                    <li>
                        - Mũi tiêm tiếp theo chỉ được đặt giữ 28 ngày sau khi đã hoàn tất mũi tiêm
                        trước. Đối với các vắc xin đặc biệt thời gian quy định có thể dài hơn tuỳ
                        theo phác đồ tiêm chủng.
                    </li>
                    <li>- Một Người tiêm có thể đặt giữ không giới hạn số lượng Gói vắc xin.</li>
                </ul>
                <h2 className="font-bold">QUY ĐỊNH VỀ GIÁ VẮC XIN</h2>
                <h3 className="font-semibold">*GIÁ GÓI</h3>
                <ul>
                    <li>
                        - Chúng tôi lựa chọn những vắc xin nhập khẩu từ nước ngoài của các hãng sản
                        xuất uy tín, nổi tiếng thế giới và số ít các vắc xin được sản xuất tại Việt
                        Nam đã được kiểm chứng về độ hiệu quả và an toàn. Toàn bộ vắc xin trong hệ
                        thống phòng tiêm được bảo quản nghiêm ngặt theo khuyến cáo của Tổ chức Y tế
                        Thế giới (WHO) và nhà sản xuất.
                    </li>
                    <li>
                        - Chúng tôi cam kết cung cấp đầy đủ vắc xin theo gói của Quý khách hàng đã
                        lựa chọn, đảm bảo quyền lợi cho Quý khách hàng ngay cả khi tình trạng khan
                        hiếm vắc xin có thể xảy ra. Khách hàng được giữ giá vắc xin đã mua theo thoả
                        thuận trong suốt quá trình sử dụng gói.
                    </li>
                    <li>
                        - Trường hợp có sự biến động lớn về giá nhập mua trên thị trường, giá gói
                        vắc xin có thể thay đổi.
                    </li>
                </ul>
                <h3 className="font-semibold">*GIÁ VẮC XIN ĐẶT GIỮ</h3>
                <ul>
                    <li>
                        Giá vắc xin đặt giữ theo yêu cầu = giá vắc xin + phí đặt giữ (được tính bằng
                        20% giá bán lẻ vắc xin đó tại thời điểm thanh toán). Phí này bao gồm:
                        <ul>
                            <li>
                                - Chi phí đảm bảo khách hàng được sử dụng vắc xin theo thời gian phù
                                hợp với phác đồ và chỉ định của bác sĩ trong vòng 12 tháng kể từ
                                ngày đăng ký dịch vụ.
                            </li>
                            <li>
                                - Chi phí lưu giữ, bảo quản vắc xin lên đến 12 tháng trong điều kiện
                                bảo quản chuyên nghiệp của Trung tâm.
                            </li>
                            <li>
                                - Chi phí chống trượt giá: khách hàng không phải đóng thêm bất cứ
                                chi phí nào ngay cả khi vắc xin tăng giá.
                            </li>
                            <li>
                                - Chi phí vận chuyển, luân chuyển vắc xin để đảm bảo khách hàng được
                                phục vụ đúng thời gian yêu cầu.
                            </li>
                        </ul>
                    </li>
                </ul>
                <h2 className="font-bold">QUY ĐỊNH VỀ THANH TOÁN</h2>
                <ul>
                    <li>
                        - Tất cả đơn đặt giữ vắc xin cần có sự tư vấn và xác nhận của tổng đài chăm
                        sóc khách hàng trước khi đơn đặt giữ vắc xin được xác nhận có hiệu lực thực
                        hiện tiêm chủng tại trung tâm Trung tâm.
                    </li>
                    <li>
                        - Tất cả các đơn đặt giữ vắc xin đã thanh toán thành công không được phép
                        hoàn huỷ với bất kỳ lý do nào.
                    </li>
                    <li>
                        - Không thực hiện giao hàng cho đơn đặt giữ vắc xin, mọi mũi tiêm trong đơn
                        hàng phải được thực hiện tại Hệ thống trung tâm tiêm chủng Trung tâm.
                    </li>
                </ul>
                <h2 className="font-bold">QUY ĐỊNH CHUNG</h2>
                <ul>
                    <li>
                        - Bảng giá được áp dụng từ ngày 01/09/2024 cho đến khi có thông báo mới. Giá
                        vắc xin có thể thay đổi và sẽ được thông báo chính thức trên các kênh truyền
                        thông của Trung tâm: website chính thức Trung tâm.vn, website đặt giữ vắc
                        xin vax.Trung tâm.vn và gửi văn bản đến các đối tác đặt giữ vắc xin.
                    </li>
                    <li>-Giá đã bao gồm chi phí khám, tư vấn với bác sĩ.</li>
                </ul>
            </div>
        </Modal>
    )
}
