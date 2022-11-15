using MemoryPack;

var bin = MemoryPackSerializer.Serialize(new TestClass
{
    Id = 100,
    Name = "Hello"
});

var obj = MemoryPackSerializer.Deserialize<TestClass>(bin);

if (obj != null)
    Console.WriteLine($"{obj.Id}:{obj.Name}");


// バイナリファイルへ書き込み。「C:\test」フォルダは事前に作成しておいてください。
using var fs = new FileStream("./test.bin", FileMode.Create);
using var bw = new BinaryWriter(fs);
bw.Write(bin);

[MemoryPackable]
public partial class TestClass
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
}

[MemoryPackable, GenerateTypeScript]
public partial class WeatherForecast
{
    public DateTime Date { get; set; }
    public int TemperatureC { get; set; }
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
    public string? Summary { get; set; }
}