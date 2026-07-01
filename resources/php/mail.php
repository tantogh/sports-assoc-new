<?php
// =========================================
// CORS設定
// =========================================
$allowed_origin = "https://pseudisodomic-dacolleta-francis.ngrok-free.dev"; // <--要書き換え
header("Access-Control-Allow-Origin: {$allowed_origin}");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// ==========================================
// 初期設定
// ==========================================
// フロントエンド（Next.js）が結果を理解しやすいようにJSON形式で返す設定
header('Content-Type: application/json; charset=UTF-8');

// POSTリクエスト以外（ブラウザで直接URLを叩かれた場合など）はエラーにして弾く
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => '無効なリクエストです。']);
    exit;
}

// 日本語の文字化けを防ぐ設定
mb_language("japanese");
mb_internal_encoding("UTF-8");


// ==========================================
// 1. サニタイズ（無害化）関数
// ==========================================
function sanitize($str) {
    if ($str === null) return '';
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}


// ==========================================
// 2. データの受け取りとチェック
// ==========================================
$name = sanitize(isset($_POST['name']) ? $_POST['name'] : '');
$phone = sanitize(isset($_POST['phone']) ? $_POST['phone'] : '');
$email = sanitize(isset($_POST['email']) ? $_POST['email'] : '');
$message = sanitize(isset($_POST['message']) ? $_POST['message'] : '');

// 必須項目のチェック
if ($name === '' || $phone === '' || $email === '' || $message === '') {
    http_response_code(400); // Bad Request (入力エラー)
    echo json_encode(['error' => '必須項目が入力されていません。']);
    exit;
}

// ヘッダインジェクション対策（改行コードのブロック）
if (preg_match("/[\r\n]/", $name) || preg_match("/[\r\n]/", $phone) || preg_match("/[\r\n]/", $email)) {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => '不正な入力が検出されました。']);
    exit;
}


// ==========================================
// 3. メールの送信処理
// ==========================================
// ★ご自身が受け取りたいメールアドレスに変更してください
$to = "msredcomet06@gmail.com";
$subject = "石川県パラスポーツ協会【お問い合わせ】より";

$body = "お名前: " . $name . "\n";
$body .= "電話番号: " . $phone . "\n";
$body .= "メールアドレス: " . $email . "\n\n";
$body .= "お問い合わせ内容:\n" . $message;

// 送信元（From）の設定
$headers = "From: " . $email;


// ==========================================
// 4. 送信実行と結果の返却
// ==========================================
if (mb_send_mail($to, $subject, $body, $headers)) {
    // 送信成功時：ステータスコード200 (OK) を返す
    http_response_code(200);
    echo json_encode(['message' => '送信が完了しました。']);
} else {
    // 送信失敗時：ステータスコード500 (Internal Server Error) を返す
    http_response_code(500);
    echo json_encode(['error' => 'メールの送信に失敗しました。サーバーのメール設定をご確認ください。']);
}
?>